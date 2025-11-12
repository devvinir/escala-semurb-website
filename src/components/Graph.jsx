import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";
import "../styles/Graph.css";
import {useAuth} from '../hook/useAuth'
import { BeatLoader } from "react-spinners";


function MyChart() {
  const [data, setData] = useState([]);
  const {scalesEmployees, sectorsEmployees, user, admin} = useAuth()
  
  useEffect(() => {
    if(user){
    if(scalesEmployees?.result){
   const dataChart = [
      ["Escala", "Funcionarios", { role: "style" }],
      //...retira o array extra
      ...scalesEmployees.result.map(info =>[
        info?.tipo_escala, 
        Number(info?.quantidade), 
        "#F4D03F"
      ])
    ];
    setData(dataChart)
  }}
  else if (admin){
    if(sectorsEmployees?.result){console.log(sectorsEmployees)
      const dataChart = [
        ['Setores', 'Funcionarios', {role: 'style'}],
        ...sectorsEmployees.result.map(info =>[
          info?.nome_setor, 
          Number(info?.quantidade), 
          '#F4D03F'
        ])
      ];
      setData(dataChart)
    }}
}, [scalesEmployees, sectorsEmployees]); 

  const options = {
    backgroundColor: "transparent",
    title: "Funcionários por Escala",
    titleTextStyle: { color: "#F4D03F" },
    chartArea: { width: "80%" },
    hAxis: {
      title: "Escalas",
      minValue: 0,
      textStyle: { color: "#F4D03F" },
      titleTextStyle: { color: "#F4D03F" },
    },
    vAxis: {
      title: "Total de Funcionarios",
      textStyle: { color: "#F4D03F" },
      titleTextStyle: { color: "#F4D03F" },
    },
    legend: { textStyle: { color: "#F4D03F" } },
  };

  if (data.length === 0) return <p className="loading-text">Carregando dados<BeatLoader size={15} color='#F4D03F'/></p>

  return (
    <div className="container-graph">
      <Chart
        chartType="ColumnChart"
        data={data}
        options={options}
        width="100%"
        height="400px"
        legendToggle
      />
    </div>
  );
}

export default MyChart;
