import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest { return { name:"Bweza Pharmacy", short_name:"Bweza Pharmacy", description:"Pharmacy enquiries and services in Kibuye, Kampala.", start_url:"/", display:"standalone", background_color:"#ffffff", theme_color:"#087a3e", icons:[{src:"/images/bweza-logo.jpg",sizes:"697x560",type:"image/jpeg"}] }; }
