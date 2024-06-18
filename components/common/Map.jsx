// import React, { useState, useEffect } from "react";
// import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
// import { Typography, Box } from "@mui/material";

// const libraries = ["places"];

// function MapaConGoogleMaps(props) {
//   const { latProp, lngProp, setAddress } = props;

//   const [map, setMap] = useState(null);
//   const [markers, setMarkers] = useState([]);

//   const { isLoaded } = useJsApiLoader({
//     id: "google-map-script",
//     googleMapsApiKey: "AIzaSyBo69BTUOUejxqNKdRywbS2qw2icGKTqnU",
//     libraries: libraries,
//   });

//   const onLoad = React.useCallback(function callback(map) {
//     setMap(map);

//     const initialMarker = new window.google.maps.Marker({
//       position: { lat: latProp, lng: lngProp },
//       map: map,
//     });
//     setMarkers([initialMarker]);

//     const geocoder = new window.google.maps.Geocoder();
//     const latlng = { lat: latProp, lng: lngProp };
//     geocoder.geocode({ location: latlng }, function (results, status) {
//       if (status === "OK") {
//         if (results[0]) {
//           const direccion = results[0].formatted_address;
//           console.log(`Dirección: ${direccion}`);
//           const locationText = document.createElement("div");
//           locationText.textContent = `Dirección: ${direccion}`;
//           document.getElementById("location-text").innerHTML = "";
//           document.getElementById("location-text").appendChild(locationText);
//         } else {
//           console.log(
//             "No se encontraron resultados de geocodificación inversa."
//           );
//         }
//       } else {
//         console.log("La geocodificación inversa falló debido a: " + status);
//       }
//     });
//   }, []);

//   const onUnmount = React.useCallback(function callback(map) {
//     setMap(null);
//   }, []);

//   const mapContainerStyle = {
//     width: "100%",
//     height: "200px",
//   };

//   return isLoaded ? (
//     <div>
//       <GoogleMap
//         mapContainerStyle={mapContainerStyle}
//         center={{ lat: latProp, lng: lngProp }}
//         zoom={13}
//         onLoad={onLoad}
//         onUnmount={onUnmount}
//       >
//         {markers.map((marker, index) => (
//           <Marker key={index} position={marker.position} />
//         ))}
//       </GoogleMap>
//       <Box
//         id="location-text"
//         position="fixed"
//         top={10}
//         right={10}
//         bgcolor="white"
//         p={2}
//         border={1}
//         borderColor="#ccc"
//         borderRadius={1}
//       >
//         <Typography variant="body1">Dirección:</Typography>
//       </Box>
//     </div>
//   ) : (
//     <></>
//   );
// }

// export default MapaConGoogleMaps;



import React, { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { Box } from "@mui/material";

const libraries = ["places"];

function MapaConGoogleMaps(props) {
  const { latProp, lngProp, setAddress } = props;

  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBo69BTUOUejxqNKdRywbS2qw2icGKTqnU",
    libraries: libraries,
  });

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);

    const initialMarker = new window.google.maps.Marker({
      position: { lat: latProp, lng: lngProp },
      map: map,
    });
    setMarkers([initialMarker]);

    const geocoder = new window.google.maps.Geocoder();
    const latlng = { lat: latProp, lng: lngProp };
    geocoder.geocode({ location: latlng }, function (results, status) {
      if (status === "OK") {
        if (results[0]) {
          const direccion = results[0].formatted_address;
          console.log(`Dirección: ${direccion}`);
          setAddress(direccion); // Llamada a la función setAddress con la dirección
        } else {
          console.log("No se encontraron resultados de geocodificación inversa.");
        }
      } else {
        console.log("La geocodificación inversa falló debido a: " + status);
      }
    });
  }, [latProp, lngProp, setAddress]);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const mapContainerStyle = {
    width: "100%",
    height: "200px",
  };

  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={{ lat: latProp, lng: lngProp }}
        zoom={16}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.position} />
        ))}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default MapaConGoogleMaps;
