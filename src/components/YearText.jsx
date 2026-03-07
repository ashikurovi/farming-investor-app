 "use client";
 
 export default function YearText() {
   const year = new Date().getUTCFullYear();
   return <>{year}</>;
 }
