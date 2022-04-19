export function addOffset(map){
    const offSetY = map.getSize().y * 0.12;

    map.panBy([0, -offSetY], {animate: false})
}