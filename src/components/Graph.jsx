import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";
import "../styles/Graph.css";
import {useAuth} from '../hook/useAuth'
import { BeatLoader } from "react-spinners";
import DemoData from "../api/demodata.json"

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
        info?.scale_type, 
        Number(info?.quantidade), 
        "#F4D03F"
      ])
    ];
    setData(dataChart)
  }}


  else if (admin){
    if(sectorsEmployees?.result){
      const dataChart = [
        ['Setores', 'Funcionarios', {role: 'style'}],
        ...sectorsEmployees.result.map(info =>[
          info?.name, 
          Number(info?.quantidade), 
          '#F4D03F'
        ])
      ];
      setData(dataChart)
    }}


     else {
    const dataChart = [
        ["Escala", "Funcionarios", { role: "style" }],
        //...retira o array extra
        ...DemoData.scale.map(scale =>{

            const qntd = DemoData.employee.filter(
                emp => emp.scale_id === scale.id
            ).length
            return[
            scale?.scale_type, 
            qntd, 
            "#F4D03F"
            ]
        })
    ]
        
        setData(dataChart)
    }},[scalesEmployees, sectorsEmployees, user, admin]); 

   

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
