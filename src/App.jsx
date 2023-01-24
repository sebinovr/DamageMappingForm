import { useState } from "react"
import { geometry } from "./data/Geometry"
import { structure } from "./data/Structure"
import { stress } from "./data/Stress"
import { corrosion } from "./data/Corrosion"
import { massCondition } from "./data/MassCondition"
import { scoreGS } from "./data/ScoreGS"
import { levelExposure } from "./data/LevelExposure"
import { risk } from "./data/RiskOutput"
import { legendRisk } from "./data/LegendRisk"

function App() {
  //Geometry Values
  const geometryValues = geometry
  const [stateGeometry, setStateGeometry] = useState([])

  //Structures Values
  const structureValues = structure
  const [stateStructure, setStateStructure] = useState([])

  //Stress Values
  const stressValues = stress
  const [stateStress, setStateStress] = useState([])

  //Corrosion Values
  const corrosionValues = corrosion
  const [stateCorrosion, setStateCorrosion] = useState([])
  
  //MassCondition Values
  const massConditionValues = massCondition
  const [stateMassCondition, setStateMassCondition] = useState([])

  //Score Ground Support & Mass Rock Condition - DATA BASE
  const scoreGSValues = scoreGS

  //Level Exposure and Consequence
  const levelExposureValues = levelExposure
  const [stateLevelExposure, setStateLevelExposure] = useState([])

  //RiskOutput 
  const riskValues = risk

  //LegendRisk
  const legendRiskValues = legendRisk
  
  //Score Ground Support & Mass Rock Condition - Selected by USER
  var scoreId = []
  if (stateCorrosion.length > 0 && stateMassCondition.length>0){
    scoreId[0] = Number(stateCorrosion)
    scoreId[1] = Number(stateMassCondition)
  }
    
  //Check selection by user with Database
  var score = 0
  const newArray = scoreGSValues.map( array => {
    if(scoreId[0]===array.id[0] && scoreId[1]===array.id[1]){
      score = array.value
    }})
  
  //Rating Ground Support & Mass Rock Condition
  if(score === 1){
    var ratingGS = 0
  } else if(score>=2 && score<=4){
    ratingGS = 1
  } else if(score>=5 && score<=6){
    ratingGS = 2
  }else if(score>=8 && score<=12){
    ratingGS = 3
  }else if(score>=15 && score<=16){
    ratingGS = 5
  }else if(score>=20){
    ratingGS =10
  }

  //Overall Damage Mapping Rating
  if (stateGeometry.length > 0 && stateStructure.length > 0 && stateStress.length > 0 && stateCorrosion.length > 0 && stateMassCondition.length >0) {
    var DamageMappingRating = Number(stateGeometry)+ Number(stateStructure) + Number(stateStress) + ratingGS
  } else {
    DamageMappingRating = '---'
  }
  

  //Ranges for Overall Damage and setting coordenates (row and columns)
  var arraySet = [0,0]
  //Setting row
  if(DamageMappingRating>=0 && DamageMappingRating<=3){
    arraySet[0] = 1
  } else if(DamageMappingRating>=4 && DamageMappingRating<=5){
    arraySet[0] = 2
  } else if(DamageMappingRating>=6 && DamageMappingRating<=8){
    arraySet[0] = 3
  }else if(DamageMappingRating>=9 && DamageMappingRating<=12){
    arraySet[0] = 4
  }else if(DamageMappingRating>=13 && DamageMappingRating<=19){
    arraySet[0] = 5
  }
  //Setting column
  arraySet[1]=Number(stateLevelExposure)

  //Check selection by user with Database 
  var priority = ''
  const riskArray = riskValues.map( array => {
  if(arraySet[0]===array.id[0] && arraySet[1]===array.id[1]){
    priority = array.value
  }})

  var legendPriority =''
  const legendArray = legendRiskValues.map( array => {
  if( priority===array.value){
    legendPriority = array.name;
  }})

  var legendFrequency=''
  const frequencyArray = legendRiskValues.map( array => {
    if( priority===array.value){
      legendFrequency = array.frequency;
    }})
  

  return (
    <>
      {/* Titulo */}
      <div className="bg-gray-600 text-3xl text-white p-5">
        <h1 className="text-center">Damage Mapping Form</h1>
      </div>

      <div className="bg-gray-500 text-xl text-white p-2">
        <h2 className="text-center">Select your parameters here!</h2>
      </div>

      {/* Selects */}
      <div className="flex p-5 h-auto">
        <div className="flex flex-col border w-1/5 text-center p-3">
          <label>Geometry</label>
          <select 
            className="p-2"
            value={stateGeometry}
            onChange = { e => setStateGeometry (e.target.value)}
            >
            <option value="">Select</option>
            {geometryValues.map (options => (
              <option 
                key = {options.id}
                value = {options.rating}
              >{options.name}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col border w-1/5 text-center p-3">
          <label>Structure</label>
          <select 
            className="p-2"
            value={stateStructure}
            onChange = { e => setStateStructure(e.target.value)}
            >
            <option value="">Select</option>
            {structureValues.map (options => (
              <option 
                key = {options.id}
                value = {options.rating}
              >{options.name}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col border w-1/5 text-center p-3">
          <label>Stress</label>
          <select 
            className="p-2"
            value={stateStress}
            onChange = { e => setStateStress(e.target.value)}         
            >
            <option value="">Select</option>
            {stressValues.map (options => (
              <option 
                key = {options.id}
                value = {options.rating}
              >{options.name}</option>
            ))}
          </select>
        </div>

        <div className="flex border w-2/5">
        <div className="flex flex-col w-1/2 text-center p-3">
              <label>Corrotion</label>
              <select 
                className="p-2"
                value={stateCorrosion}
                onChange = { e => setStateCorrosion(e.target.value)}
                >
                <option value="">Select</option>
                {corrosionValues.map (options => (
                  <option 
                    key = {options.id}
                    value = {options.rowValue}
                  >{options.name}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col w-1/2 text-center p-3">
              <label>Ground Support/Rock Mass</label>
              <select 
                className="p-2"
                value={stateMassCondition}
                onChange = {e => setStateMassCondition(e.target.value)}
                >
                <option value="">Select</option>
                {massConditionValues.map (options => (
                  <option 
                    key = {options.id}
                    value = {options.columnValue}
                  >{options.name}</option>
                ))}
              </select>
            </div>
          </div>
      </div>


        {/* Rating */}
        <div className="bg-gray-500 text-xl text-white p-2">
          <h2 className="text-center">Risk Assessment Matrix</h2>
        </div>

        <div className="flex p-5 h-auto">
          <div className="flex flex-col border w-1/5 text-center p-3">
            <p>Geometry Rating:</p>
            <p>{stateGeometry}</p>
          </div>

          <div className="flex flex-col border w-1/5 text-center p-3">
            <p>Structure Rating:</p>
            <p>{stateStructure}</p>
          </div>

          <div className="flex flex-col border w-1/5 text-center p-3">
            <p>Stress Rating:</p>
            <p>{stateStress}</p>
          </div>

          <div className="flex flex-col border w-2/5 text-center p-3">
            <p>Ground Support Rating:</p>
            <p>{ratingGS}</p>
          </div>
        </div>


        {/* Overall Damage Mapping Rating */}
        <div className="flex justify-center h-auto">
          <div className="flex flex-col content-center border w-3/8 text-center p-3 bg-red-400 font-bold">
            <p>Damage Mapping Rating:</p>
            <p className="mt-2">{DamageMappingRating}</p>
          </div>

          <div className="flex flex-col content-center border w-3/8 text-center p-3">
            <p>Level Exposure & Consequence:</p>
            <select 
              className="p-2 w-64"
              value={stateLevelExposure}
              onChange = { e => setStateLevelExposure(e.target.value)}
              >
              <option value="">Select</option>
              {levelExposureValues.map (options => (
                <option 
                  key = {options.id}
                  value = {options.value}
                >{options.name}</option>
              ))}
            </select>
          </div>
        </div>
      
      {/* Risk Output and Frequency of Inspection */}
        <div className="bg-gray-500 text-xl text-white p-2 mt-5">
          <h2 className="text-center">Risk Output and Frequency of Inspection</h2>
        </div>

        <div className="flex justify-center p-5 h-auto">
          <div className="flex flex-col border w-2/5 text-center p-3">
            <p>Priority of Rehab:</p>
            <p>{legendPriority}</p>
          </div>

          <div className="flex flex-col border w-2/5 text-center p-3">
            <p>Frequency of Inspections:</p>
            <p>{legendFrequency}</p>
          </div>
        </div>

      </>
  )
}

export default App
