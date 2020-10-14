import React, {useEffect} from 'react';
import Chart from 'chart.js';
import axios from 'axios';
import DoughnutChart from '../DoughnutChart/DoughnutChart';


function HomePage() {
  var dataSource = {
    datasets: [
      {
        data: [],
        backgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#fd6b19",
          "#8a89a6",
          "#a05d56",
          "#7b6888",
          "#d0743c",
          "#98abc5",
        ],
      },
    ],
    labels: [],
  };
  
  useEffect(() => {
    axios.get('http://localhost:3001/budget').then((res)=>{
        for (var i = 0; i < res.data.length; i++) {
          dataSource.datasets[0].data[i] = res.data[i].budget;
          dataSource.labels[i] = res.data[i].title;
        }
      const ctx = document.getElementById("myChart");
      new Chart(ctx, {
        type: "pie",
        data: dataSource,
      });
      });
  });
  return (
    <main className="container center" id="main">
      <div className="page-area">
        
        <article className="text-box">
          <h1>Stay on track</h1>
          <p>
            Do you know where you are spending your money? If you really stop to
            track it down, you would get surprised! Proper budget management
            depends on real data... and this app will help you with that!
          </p>
        </article>
        
        <article className="text-box">
          <h1>Alerts</h1>
          <p>
            What if your clothing budget ended? You will get an alert. The goal
            is to never go over the budget.So, try out new budget app which
            brings your budget plan. Getting everything done within a minute
            would be fun.
          </p>
        </article>
       
        <article className="text-box">
          <h1>Results</h1>
          <p>
            People who stick to a financial plan, budgeting every expense, get
            out of debt faster! Also, they to live happier lives... since they
            expend without guilt or fear... because they know it is all good and
            accounted for.
          </p>
        </article>
    
        <article className="text-box">
          <h1>Free</h1>
          <p>
            If you really stop to track it down, you would get surprised! Proper
            budget management depends on real data... and this app will help you
            with that! Get your most favorite food and cloths by adjusting your
            budget.
          </p>
        </article>
        
        <article className="text-box">
          <h1>Stay on track</h1>
          <p>
            Do you know where you are spending your money? If you really stop to
            track it down, you would get surprised! Proper budget management
            depends on real data... and this app will help you with that!
          </p>
        </article>
        
        <article className="text-box">
          <h1>Alerts</h1>
          <p>
            What if your clothing budget ended? You will get an alert. The goal
            is to never go over the budget.So, try out new budget app which
            brings your budget plan.Getting everything done within a minute
            would be fun.
          </p>
        </article>
       
        <article className="text-box">
          <h1>Doughnut Chart</h1>
          <DoughnutChart/> 
        </article>
        
        <article className="text-box">
          <h1>Pie-Chart</h1>
          <p><canvas id="myChart" width = "100" height = "100"></canvas></p> 
        </article>
      </div>
    </main>
  );
}

export default HomePage;