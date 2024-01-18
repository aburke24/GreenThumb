import styled from 'styled-components';

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100%, 1fr)); /* Adjust the minimum and maximum size as needed */
  border: 2px solid white;
  border-radius: 3%;
  gap:.2%;
  height:350px;
  width:140px;
  padding:2%;
  background-color: rgb(113, 64, 29);;
`;

export const GridItem = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: 1px solid #ccc;
  border-radius: 3%;
  box-sizing: border-box;
`;
export const GardenBedName = styled.h3`
  color: #333; /* Adjust the color as needed */
  margin-top: 3px; /* Adjust the margin as needed */
  text-align: left;
  padding-left:23%;
  color:white;
`;