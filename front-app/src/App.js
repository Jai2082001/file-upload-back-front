import './App.css';
import { useEffect, useState } from 'react'


function App() {

  const [videoDetails, changeVideoDetails] = useState([])
  const [pdfDetails, changePdfDetails] = useState([]);
  const [state, changeState] = useState(0);
  const [loading, changeloading] = useState(false)
  // const [videos, changeVideo] = useState([])
  // const [pdfs, changePdf] = useState([])
  const [data, changeData] = useState(false)
  useEffect(() => {
    fetch(`${process.env.REACT_APP_FETCH_LINK}/details`).then((response) => {
      return response.json()
    }).then((response) => {
      console.log(response)
      let video = []
      let pdf = [];
      changeVideoDetails(response.video);
      videoDetails.map((single) => {
        const details = require(`./outerRes/${single.name}`);
        console.log(details)
        video.push(details)
      })
      changePdfDetails(response.pdf)
      pdfDetails.map((single) => {
        const details = require(`./outerRes/${single.name}`)
        console.log(details)
        pdf.push(details)
      })
      console.log(video, pdf)
      let dataTemp = { video: video, pdf: pdf };
      console.log(dataTemp);
      changeData(dataTemp)
      changeloading(true)
    })
  }, [loading])

  console.log(data)

  return (
    <div className="App">
      {data.video && 
      <>
        {data.video.map((single)=>{
          return (
            <video style={{maxWidth: '500px'}} autoPlay controls src={single}></video>
          )
        })}
      </>}
      {data.pdf && 
      <>
        {/* {data.pdf.map((singleItem)=>)} */}
      </>
      }
    </div>
  );
}

export default App;
