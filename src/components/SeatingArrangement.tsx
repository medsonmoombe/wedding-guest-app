// import React from 'react';
// import image1 from '../assets/images/s1.svg';
// import image2 from '../assets/images/s2.svg';
// import image3 from '../assets/images/s3.svg';

// const zoneData = [
//   {
//     zoneId: 1,
//     zoneName: 'Zone A',
//     tables: [
//       {
//         tableId: 101,
//         tableName: 'Table 1',
//         chairs: [
//           { chairId: 1001, seatNumber: 1 },
//           { chairId: 1002, seatNumber: 2 },
//           { chairId: 1003, seatNumber: 3 },
//           { chairId: 1004, seatNumber: 4 },
//           { chairId: 1005, seatNumber: 5 },
//           { chairId: 1006, seatNumber: 6 },
//           { chairId: 1007, seatNumber: 7 },
//           { chairId: 1008, seatNumber: 8 },
//         ],
//       },
//       {
//           tableId: 101,
//           tableName: 'Table 1',
//           chairs: [
//             { chairId: 1001, seatNumber: 1 },
//             { chairId: 1002, seatNumber: 2 },
//             { chairId: 1003, seatNumber: 3 },
//             { chairId: 1004, seatNumber: 4 },
//             { chairId: 1005, seatNumber: 5 },
//             { chairId: 1006, seatNumber: 6 },
//             { chairId: 1007, seatNumber: 7 },
//             { chairId: 1008, seatNumber: 8 },
//           ],
//         },
//       {
//         tableId: 102,
//         tableName: 'Table 2',
//         chairs: [
//           { chairId: 1009, seatNumber: 1 },
//           { chairId: 1010, seatNumber: 2 },
//           { chairId: 1011, seatNumber: 3 },
//           { chairId: 1012, seatNumber: 4 },
//           { chairId: 1013, seatNumber: 5 },
//           { chairId: 1014, seatNumber: 6 },
//           { chairId: 1015, seatNumber: 7 },
//           { chairId: 1016, seatNumber: 8 },
//         ],
//       },
//       // Add more tables here if needed
//     ],
//   },
//   {
//     zoneId: 2,
//     zoneName: 'Zone B',
//     tables: [
//       {
//         tableId: 201,
//         tableName: 'Table 1',
//         chairs: [
//           { chairId: 1017, seatNumber: 1 },
//           { chairId: 1018, seatNumber: 2 },
//           { chairId: 1019, seatNumber: 3 },
//           { chairId: 1020, seatNumber: 4 },
//           { chairId: 1021, seatNumber: 5 },
//           { chairId: 1022, seatNumber: 6 },
//           { chairId: 1023, seatNumber: 7 },
//           { chairId: 1024, seatNumber: 8 },
//         ],
//       },
//       {
//           tableId: 201,
//           tableName: 'Table 1',
//           chairs: [
//             { chairId: 1017, seatNumber: 1 },
//             { chairId: 1018, seatNumber: 2 },
//             { chairId: 1019, seatNumber: 3 },
//             { chairId: 1020, seatNumber: 4 },
//             { chairId: 1021, seatNumber: 5 },
//             { chairId: 1022, seatNumber: 6 },
//             { chairId: 1023, seatNumber: 7 },
//             { chairId: 1024, seatNumber: 8 },
//           ],
//         },
//         {
//           tableId: 201,
//           tableName: 'Table 1',
//           chairs: [
//             { chairId: 1017, seatNumber: 1 },
//             { chairId: 1018, seatNumber: 2 },
//             { chairId: 1019, seatNumber: 3 },
//             { chairId: 1020, seatNumber: 4 },
//             { chairId: 1021, seatNumber: 5 },
//             { chairId: 1022, seatNumber: 6 },
//             { chairId: 1023, seatNumber: 7 },
//             { chairId: 1024, seatNumber: 8 },
//           ],
//         },
//         {
//           tableId: 201,
//           tableName: 'Table 1',
//           chairs: [
//             { chairId: 1017, seatNumber: 1 },
//             { chairId: 1018, seatNumber: 2 },
//             { chairId: 1019, seatNumber: 3 },
//             { chairId: 1020, seatNumber: 4 },
//             { chairId: 1021, seatNumber: 5 },
//             { chairId: 1022, seatNumber: 6 },
//             { chairId: 1023, seatNumber: 7 },
//             { chairId: 1024, seatNumber: 8 },
//           ],
//         },
//         {
//           tableId: 201,
//           tableName: 'Table 1',
//           chairs: [
//             { chairId: 1017, seatNumber: 1 },
//             { chairId: 1018, seatNumber: 2 },
//             { chairId: 1019, seatNumber: 3 },
//             { chairId: 1020, seatNumber: 4 },
//             { chairId: 1021, seatNumber: 5 },
//             { chairId: 1022, seatNumber: 6 },
//             { chairId: 1023, seatNumber: 7 },
//             { chairId: 1024, seatNumber: 8 },
//           ],
//         },
//         {
//           tableId: 201,
//           tableName: 'Table 1',
//           chairs: [
//             { chairId: 1017, seatNumber: 1 },
//             { chairId: 1018, seatNumber: 2 },
//             { chairId: 1019, seatNumber: 3 },
//             { chairId: 1020, seatNumber: 4 },
//             { chairId: 1021, seatNumber: 5 },
//             { chairId: 1022, seatNumber: 6 },
//             { chairId: 1023, seatNumber: 7 },
//             { chairId: 1024, seatNumber: 8 },
//           ],
//         },
//         {
//           tableId: 201,
//           tableName: 'Table 1',
//           chairs: [
//             { chairId: 1017, seatNumber: 1 },
//             { chairId: 1018, seatNumber: 2 },
//             { chairId: 1019, seatNumber: 3 },
//             { chairId: 1020, seatNumber: 4 },
//             { chairId: 1021, seatNumber: 5 },
//             { chairId: 1022, seatNumber: 6 },
//             { chairId: 1023, seatNumber: 7 },
//             { chairId: 1024, seatNumber: 8 },
//           ],
//         },
//         {
//           tableId: 201,
//           tableName: 'Table 1',
//           chairs: [
//             { chairId: 1017, seatNumber: 1 },
//             { chairId: 1018, seatNumber: 2 },
//             { chairId: 1019, seatNumber: 3 },
//             { chairId: 1020, seatNumber: 4 },
//             { chairId: 1021, seatNumber: 5 },
//             { chairId: 1022, seatNumber: 6 },
//             { chairId: 1023, seatNumber: 7 },
//             { chairId: 1024, seatNumber: 8 },
//           ],
//         },
//     ],
//   },
// ];

// interface Chair {
//   x: number;
//   y: number;
//   width: number;
//   height: number;
// }

// interface Table {
//   x: number;
//   y: number;
//   width: number;
//   height: number;
//   chairs: Chair[];
// }

// interface Zone {
//   zoneId: number;
//   name: string;
//   tables: Table[];
// }

// interface Room {
//   children: React.ReactNode;
// }

// const RoomComponent = ({ children }: Room) => {
//   const roomWidth = 600;
//   const roomHeight = 600;

//   return (
//     <svg width={roomWidth} height={roomHeight}>
//       {/* Render room */}
//       <g>
//         <rect x={0} y={0} width={roomWidth} height={roomHeight} fill="#E5E5E5" stroke="black" strokeWidth={2} />
//         {/* Render entrance */}
//         {children}
//       </g>
//     </svg>
//   );
// };

// const ZoneComponent = ({ name, tables, x, y }: Zone & { x: number; y: number }) => {
//     const zoneWidth = 160; // Reduced zone width by 50%
//     const zoneHeight = 60; // Reduced zone height by 50%
//     const tableWidth = 20; // Increased table width
//     const tableHeight = 15; // Increased table height
//     const chairSize = 3; // Adjusted chair size
//     const numRows = Math.ceil(tables.length / 2);
//     const spacingX = 20; // Adjusted horizontal spacing between tables
//     const spacingY = 15; // Adjusted vertical spacing between tables
  
//     const zoneStyle = {
//       fill: 'yellow',
//       stroke: 'black',
//       strokeWidth: 2,
//     };
  
//     const tableStyle = {
//       fill: 'white',
//       stroke: 'black',
//       strokeWidth: 1,
//     };
  
//     const chairStyle = {
//       fill: 'white',
//       stroke: 'red',
//       strokeWidth: 2,
//     };
  
//     return (
//       <g transform={`translate(${x}, ${y})`}>
//         {/* Render zone */}
//         <rect x={0} y={0} width={zoneWidth} height={zoneHeight} style={zoneStyle} />
//         {tables.map((table, index) => (
//           <g key={index} transform="translate(10, 8)">
//             {/* Render table */}
//             <rect
//               x={(index % numRows) * (tableWidth + spacingX)} // Adjusted x-coordinate for positioning tables with spacing
//               y={Math.floor(index / numRows) * (tableHeight + spacingY)} // Adjusted y-coordinate for positioning tables with spacing
//               width={tableWidth}
//               height={tableHeight}
//               style={tableStyle}
              
//             />
//             {/* Render chairs around the table */}
//             {table.chairs.map((chair, chairIndex) => (
//               <rect
//                 key={chairIndex}
//                 x={(index % numRows) * (tableWidth + spacingX) + chair.x} // Adjusted x-coordinate for positioning chairs
//                 y={Math.floor(index / numRows) * (tableHeight + spacingY) + chair.y} // Adjusted y-coordinate for positioning chairs
//                 width={chairSize}
//                 height={chairSize}
//                 style={chairStyle}
//               />
//             ))}
//           </g>
//         ))}
//         {/* Render zone name */}
//         <text x={10} y={20} fontSize="8" transform="translate(10, -25)" fontWeight="bold">
//           {name}
//         </text>
//       </g>
//     );
//   };
  
  
  
  
//   interface Prop {
//     zoneData: any;
//   }
  

// const SeatingArrangement = ({zoneData}: Prop) => {
  

//   const zones: Zone[] = zoneData.map((z: { zoneId: any; zoneName: any; tables: any[]; }) => ({
//     zoneId: z.zoneId,
//     name: z.zoneName,
//     tables: z.tables.map((t: { chairs: { chairId: number; seatNumber: number; }[]; }, tableIndex: number) => ({
//         x: 10 + (tableIndex % 2) * 70, // Adjusted x-coordinate for positioning tables
//         y: 10 + Math.floor(tableIndex / 2) * 50,  // Adjusted y-coordinate for positioning tables in two columns
//       width: 20,
//       height: 15,
//       chairs: generateChairs(0, 0, 20, 15, 3, t.chairs),
//     })),
//   }));

//   function generateChairs(x: number, y: number, width: number, height: number, spacing: number, tableChairs: { chairId: number; seatNumber: number }[]): Chair[] {
//     const chairs: Chair[] = [];
//     const chairSize = 3;

//     // Top side
//     chairs.push({ x: spacing, y: -spacing, width: chairSize, height: chairSize });
//     chairs.push({ x: width - spacing * 2, y: -spacing, width: chairSize, height: chairSize });

//     // Right side
//     chairs.push({ x: width + spacing / 2, y: height - spacing, width: chairSize, height: chairSize });
//     chairs.push({ x: width + spacing / 2, y: spacing, width: chairSize, height: chairSize });

//     // Bottom side
//     chairs.push({ x: width - spacing * 2, y: height + spacing / 2, width: chairSize, height: chairSize });
//     chairs.push({ x: spacing, y: height + spacing / 2, width: chairSize, height: chairSize });

//     // Left side
//     chairs.push({ x: -spacing, y: height - spacing, width: chairSize, height: chairSize });
//     chairs.push({ x: -spacing, y: spacing, width: chairSize, height: chairSize });

//     // Adjust chair positions based on table position and dimensions
//     return chairs.map((chair, index) => ({
//       ...chair,
//       x: chair.x + x,
//       y: chair.y + y,
//       width: chair.width,
//       height: chair.height,
//       chairId: tableChairs[index].chairId,
//       seatNumber: tableChairs[index].seatNumber,
//     }));
//   }

//   return (
//     <svg width="350" height="600">
//       {/* Render the room */}
//       <RoomComponent>
//         {/* Render each zone */}
//         {zones.map((zone, index) => (
//           <ZoneComponent
//             key={index}
//             zoneId={zone.zoneId}
//             name={zone.name}
//             tables={zone.tables}
//             x={10 + (index % 2) * 170} // Adjusted x-coordinate for positioning zones in two columns
//             y={10 + Math.floor(index / 2) * 300} // Adjusted y-coordinate for positioning zones in two rows
//           />
//         ))}
//         {/* Render images */}
//         <g transform="translate(180, 550)" fill="yellow">
//           <image href={image1} x={0} width="15" height="15" />
//           <image href={image2} x={20} width="15" height="15" />
//           <image href={image3} x={40} width="15" height="15" />
//         </g>
//       </RoomComponent>
//     </svg>
//   );
// };

// export default SeatingArrangement;
