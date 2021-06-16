import {CompositeLayer} from '@deck.gl/core';
import {IconLayer} from '@deck.gl/layers';
import Supercluster from 'supercluster';


function getIconName(size) {
  if (size === 0 || size === undefined) {
    return 'marker-1';
  }
  if (size < 10) {
    return `marker-${size}`;
  }
  if (size < 100) {
    return `marker-${Math.floor(size / 10)}0`;
  }
  return 'marker-100';
}

function getIconSize(size) {
  if (size === undefined) {
    return 1;
  }
  else {
    const icon_size = 1 + Math.min(100, size) / 150;
    //console.log(icon_size);
    return icon_size;
  }
}

export default class IconClusterLayer extends CompositeLayer {

  shouldUpdateState({changeFlags}) {
    return changeFlags.somethingChanged;
  }

  updateState({props, oldProps, changeFlags}) {
    const rebuildIndex = changeFlags.dataChanged || props.sizeScale !== oldProps.sizeScale;

    if (rebuildIndex) {
      const index = new Supercluster({maxZoom: 16, radius: props.sizeScale / 3});
      index.load(
        props.data.map(d => ({
          geometry: {coordinates: props.getPosition(d)},
          properties: d
        }))
      );

      //console.log(props.data)
      //console.log(index)

      this.setState({index});
    }

    const z = Math.floor(this.context.viewport.zoom);
    if (rebuildIndex || z !== this.state.z) {
      this.setState({
        //data: this.state.index.getClusters([-180, -85, 180, 85], z),
        data: this.state.index.getClusters([-380, -85, 380, 85], z),
        z
      });
    }

    //console.log(this.state)
}

  getPickingInfo({info, mode}) {
    //console.log(info);
    const pickedObject = info.object;
    if (pickedObject) {
      if (pickedObject.cluster /* && mode !== 'hover'*/) {
        info.objects = this.state.index
          .getLeaves(pickedObject.cluster_id, 25)
          .map(f => f.properties);
      }
      info.object = pickedObject;
    }
    return info;
  }

  renderLayers() {
    const {data} = this.state;
    const {layerId, iconAtlas, iconMapping, sizeScale} = this.props;

    //console.log(this.props);
    //console.log(iconMapping);
    //console.log(data);

    return new IconLayer(
      this.getSubLayerProps({
        id: layerId,
        data,
        iconAtlas,
        iconMapping,
        sizeScale,
        pickable: true,
        getPosition: d => d.geometry.coordinates,
        getIcon: d => getIconName(d.properties.point_count),
        getSize: d => getIconSize(d.properties.point_count)
      }))
  }
}
