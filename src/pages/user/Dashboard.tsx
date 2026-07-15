import React, { useState, useEffect, useRef } from 'react';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    active: 0,
    ongoing: 0,
    completed: 0,
    total: 0,
  });
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<any>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/user/dashboard');
        if (res.data && res.data.status && res.data.data) {
          const { testStats } = res.data.data;
          setStats({
            active: testStats.active || 0,
            ongoing: testStats.ongoing || 0,
            completed: testStats.completed || 0,
            total: testStats.total || 0,
          });

          // Extract graph data
          const graph = testStats.graph || [];
          const questionsList = graph.map((item: any) => Number(item.questions));
          const scoresList = graph.map((item: any) => Number(item.score));

          // Pad array to size 7
          const padArrayToSizeSeven = (arr: number[]) => {
            const temp = [...arr];
            while (temp.length < 7) {
              temp.push(0);
            }
            return temp;
          };

          const questions = padArrayToSizeSeven(questionsList);
          const scores = padArrayToSizeSeven(scoresList);

          // Draw Chart
          const win = window as any;
          if (chartRef.current && win.Chart) {
            if (chartInstance.current) {
              chartInstance.current.destroy();
            }

            chartInstance.current = new win.Chart(chartRef.current, {
              type: "radar",
              data: {
                labels: [
                  'Recent Test 1',
                  'Recent Test 2',
                  'Recent Test 3',
                  'Recent Test 4',
                  'Recent Test 5',
                  'Recent Test 6',
                  'Recent Test 7'
                ],
                datasets: [{
                  label: 'Correct Answered',
                  data: scores,
                  fill: true,
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  borderColor: 'rgb(255, 99, 132)',
                  pointBackgroundColor: 'rgb(255, 99, 132)',
                  pointBorderColor: '#fff',
                  pointHoverBackgroundColor: '#fff',
                  pointHoverBorderColor: 'rgb(255, 99, 132)'
                }, {
                  label: 'Questions Attempted',
                  data: questions,
                  fill: true,
                  backgroundColor: 'rgba(54, 162, 235, 0.2)',
                  borderColor: 'rgb(54, 162, 235)',
                  pointBackgroundColor: 'rgb(54, 162, 235)',
                  pointBorderColor: '#fff',
                  pointHoverBackgroundColor: '#fff',
                  pointHoverBorderColor: 'rgb(54, 162, 235)'
                }]
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                elements: {
                  line: {
                    borderWidth: 3
                  }
                }
              },
            });
          }
        }
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      }
    };

    fetchDashboard();

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="container-fluid">
      <div className="row column_title page_title">
        <div className="col-md-12">
          <h2 className="rt-pt-10 rt-pb-10" style={{ fontWeight: 'bold', fontSize: '24px', color: '#1a3456' }}>Dashboard</h2>
        </div>
      </div>

      <div className="row align-items-center justify-content-center">
        <div className="col-lg-12 col-sm-12">
          <div>
            <h1>
              <span className="f-size-24 rt-semiblod rt-mb-13 d-block" style={{ fontSize: '20px', fontWeight: '600' }}>
                Welcome, {user?.name}
              </span>
            </h1>
          </div>
        </div>
      </div>

      <div className="rt-spacer-40 rt-spacer-xs-20"></div>

      <div className="row">
        <div className="col-sm-6">
          <h3 className="rt-semiblod rt-mb-15 text-lg-left text-md-left" style={{ fontSize: '18px', fontWeight: 'bold' }}>
            Insights
          </h3>
        </div>
      </div>

      <div className="row">
        {/* Active Tests */}
        <div className="col-sm-6 col-md-3">
          <div className="card card-stats card-primary card-round" style={{ borderRadius: '10px', overflow: 'hidden' }}>
            <div className="card-body">
              <div className="row">
                <div className="col-4">
                  <div className="icon-big text-center">
                    <img src="/assets/images/dashboard/activelisting.png" width="42" alt="active" />
                  </div>
                </div>
                <div className="col-8 col-stats rt-pl-0">
                  <div className="numbers">
                    <p className="card-category" style={{ margin: 0, fontSize: '12px', color: '#777' }}>Active Tests</p>
                    <h4 className="card-title" style={{ fontSize: '20px', fontWeight: 'bold' }}>{stats.active}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ongoing Tests */}
        <div className="col-sm-6 col-md-3">
          <div className="card card-stats card-notsale card-round" style={{ borderRadius: '10px', overflow: 'hidden' }}>
            <div className="card-body">
              <div className="row">
                <div className="col-4">
                  <div className="icon-big text-center">
                    <img src="/assets/images/dashboard/notforsale.png" width="42" alt="ongoing" />
                  </div>
                </div>
                <div className="col-8 col-stats rt-pl-0">
                  <div className="numbers">
                    <p className="card-category" style={{ margin: 0, fontSize: '12px', color: '#777' }}>Ongoing Tests</p>
                    <h4 className="card-title" style={{ fontSize: '20px', fontWeight: 'bold' }}>{stats.ongoing}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Completed Tests */}
        <div className="col-sm-6 col-md-3">
          <div className="card card-stats card-pending card-round" style={{ borderRadius: '10px', overflow: 'hidden' }}>
            <div className="card-body">
              <div className="row">
                <div className="col-4">
                  <div className="icon-big text-center">
                    <img src="/assets/images/dashboard/pendinglisting.png" width="42" alt="completed" />
                  </div>
                </div>
                <div className="col-8 col-stats rt-pl-0">
                  <div className="numbers">
                    <p className="card-category" style={{ margin: 0, fontSize: '12px', color: '#777' }}>Completed Tests</p>
                    <h4 className="card-title" style={{ fontSize: '20px', fontWeight: 'bold' }}>{stats.completed}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Total Tests */}
        <div className="col-sm-6 col-md-3">
          <div className="card card-stats card-deleted card-round" style={{ borderRadius: '10px', overflow: 'hidden' }}>
            <div className="card-body">
              <div className="row">
                <div className="col-4">
                  <div className="icon-big text-center">
                    <img src="/assets/images/dashboard/deletedlisting.png" width="38" alt="total" />
                  </div>
                </div>
                <div className="col-8 col-stats rt-pl-0">
                  <div className="numbers">
                    <p className="card-category" style={{ margin: 0, fontSize: '12px', color: '#777' }}>Total Tests</p>
                    <h4 className="card-title" style={{ fontSize: '20px', fontWeight: 'bold' }}>{stats.total}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rt-spacer-40 rt-spacer-xs-20"></div>

      <div className="row">
        {/* Performance Chart */}
        <div className="col-lg-8 performance">
          <div className="white_card card_height_100 mb_30 p-4" style={{ borderRadius: '15px', background: '#fff', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
            <div className="white_card_header">
              <div className="box_header m-0">
                <div className="main-title">
                  <h3 className="m-0" style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a3456' }}>Performance</h3>
                </div>
              </div>
            </div>
            <div className="iframe" style={{ height: '380px', position: 'relative', marginTop: '20px' }}>
              <canvas ref={chartRef} className="w-100" style={{ height: '100%' }}></canvas>
            </div>
          </div>
        </div>

        {/* Trending Categories */}
        <div className="col-lg-4">
          <div className="white_card card_height_100 mb_30 p-4" style={{ borderRadius: '15px', background: '#fff', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', minHeight: '445px' }}>
            <div className="white_card_header">
              <div className="box_header m-0">
                <div className="main-title">
                  <h3 className="m-0" style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a3456' }}>Trending Categories</h3>
                </div>
              </div>
            </div>

            <table className="table domain-table dashboardTable mt-3">
              <tbody>
                <tr>
                  <td className="text-605" style={{ fontSize: '14px', padding: '12px 8px' }}>Data Protection and Privacy</td>
                </tr>
                <tr>
                  <td className="text-605" style={{ fontSize: '14px', padding: '12px 8px' }}>Information Security Risk Management</td>
                </tr>
                <tr>
                  <td className="text-605" style={{ fontSize: '14px', padding: '12px 8px' }}>Network Security</td>
                </tr>
                <tr>
                  <td className="text-605" style={{ fontSize: '14px', padding: '12px 8px' }}>Encryption</td>
                </tr>
                <tr>
                  <td className="text-605" style={{ fontSize: '14px', padding: '12px 8px' }}>Malware Protection</td>
                </tr>
                <tr>
                  <td className="text-605" style={{ fontSize: '14px', padding: '12px 8px' }}>Identity and Access Management (IAM)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
