import React from "react";
import Image from "next/image";
import ReactHtmlParser, { htmlparser2 } from "react-html-parser";
import { useState, useEffect } from "react";
// pk.eyJ1Ijoia2FwaXR1cyIsImEiOiJjanR5and6MjYwMXltNDN0MWxnNTFoMGxpIn0.rbpYqdyv1o5OzsDLva85Sg
var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

const ContactUs = (data) => {
  const contactData = data;
  mapboxgl.accessToken = process.env.MAPBOX_TOKEN;

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "kapitus-map",
      style: "mapbox://styles/kapitus/cjtyljmho3vok1fntmnu0c8hq",
      /*center: [-73.98387980000001, 40.75704],*/
      center: [-1.98387980000001, 30.75704],
      zoom: 2,
    });
  });

  console.log(contactData);
  return (
    <div className="bg-gray-100">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Image
            src={contactData?.data.image?.sourceUrl}
            alt=""
            width={700}
            height={500}
            className={"image"}
          />
        </div>
        {/* <div>{ReactHtmlParser(contactData.data.form)}</div> */}
      </div>
      <div id="kapitus-map" className="w-full" style={{ height: 500 }}></div>
    </div>
  );
};

export default ContactUs;
