maptilersdk.config.apiKey = mapToken;
 
const map = new maptilersdk.Map({
  container: "map",
  style: maptilersdk.MapStyle.STREETS,
  center: listingCoordinates,  // [lng, lat] from listing.geometry.coordinates
  zoom: 9,
});
 
// Add a marker at the exact listing location
new maptilersdk.Marker({ color: "#FE424D" })
  .setLngLat(listingCoordinates)
  .setPopup(
    new maptilersdk.Popup({ offset: 25 }).setHTML(
      `<h6>${listingTitle}</h6><p>Exact location provided after booking.</p>`
    )
  )
  .addTo(map);