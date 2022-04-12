import React from "react";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
const CorporateDashboard = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      // title: {
      //   display: true,
      //   text: 'Chart.js Line Chart',
      // },
    },
  };
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Donations',
        data: [1000, 5000, 3000, 2500, 1500, 5000, 2500],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Employees',
        data: [100, 600, 250, 500, 450, 230, 350],
        borderColor: 'rgb(0, 0, 128)',
        backgroundColor: 'rgba(0, 0, 128, 0.5)',
      },
    ],
  };
  return (<div>
    <div className="pagetitle">
      <h1>Dashboard</h1>
    </div>
    <section className="section dashboard">
      <div className="row">
        <div className="col-lg-8">
          <div className="row">
            <div className="col-xxl-4 col-md-6">
              <div className="card info-card sales-card">
                <div className="filter">
                  <a className="icon" href="#" data-bs-toggle="dropdown">
                    <i className="bi bi-three-dots"></i>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                    <li className="dropdown-header text-start">
                      <h6>Filter</h6>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Today
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        This Month
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        This Year
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="card-body">
                  <h5 className="card-title">
                    Employees <span>| This Month</span>
                  </h5>
                  <div className="d-flex align-items-center">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i className="bi bi-building"></i>
                    </div>
                    <div className="ps-3">
                      <h6>45</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-md-6">
              <div className="card info-card revenue-card">
                <div className="filter">
                  <a className="icon" href="#" data-bs-toggle="dropdown">
                    <i className="bi bi-three-dots"></i>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                    <li className="dropdown-header text-start">
                      <h6>Filter</h6>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Today
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        This Month
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        This Year
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="card-body">
                  <h5 className="card-title">
                    Donation <span>| This Month</span>
                  </h5>
                  <div className="d-flex align-items-center">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i className="bi bi-cash-stack"></i>
                    </div>
                    <div className="ps-3">
                      <h6>3,264,500</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="card">
                <div className="filter">
                  <a className="icon" href="#" data-bs-toggle="dropdown">
                    <i className="bi bi-three-dots"></i>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                    <li className="dropdown-header text-start">
                      <h6>Filter</h6>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Today
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        This Month
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        This Year
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="card-body">
                  <h5 className="card-title">
                    Reports
                  </h5>
                  <Line options={options} data={data} />
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="card recent-sales overflow-auto">
                <div className="filter">
                  <a className="icon" href="#" data-bs-toggle="dropdown">
                    <i className="bi bi-three-dots"></i>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                    <li className="dropdown-header text-start">
                      <h6>Filter</h6>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Today
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        This Month
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        This Year
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="card-body">
                  <h5 className="card-title">
                    Recent Corporates <span>| Today</span>
                  </h5>
                  <table className="table table-borderless datatable">
                    <thead>
                      <tr>
                        <th scope="col">Sl#</th>
                        <th scope="col">Corporates</th>
                        <th scope="col">Type</th>
                        <th scope="col">Size</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">
                          <a href="#">1</a>
                        </th>
                        <td>Brandon Jacob</td>
                        <td>
                          <a href="#" className="text-primary">
                            Disaster
                          </a>
                        </td>
                        <td>10-50</td>
                        <td>
                          <span className="badge bg-success">Approved</span>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <a href="#">2</a>
                        </th>
                        <td>Bridie Kessler</td>
                        <td>
                          <a href="#" className="text-primary">
                            Social Order
                          </a>
                        </td>
                        <td>100-500</td>
                        <td>
                          <span className="badge bg-warning">Deactivated</span>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <a href="#">3</a>
                        </th>
                        <td>Ashleigh Langosh</td>
                        <td>
                          <a href="#" className="text-primary">
                            Disaster
                          </a>
                        </td>
                        <td>50-100</td>
                        <td>
                          <span className="badge bg-success">Approved</span>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <a href="#">4</a>
                        </th>
                        <td>Angus Grady</td>
                        <td>
                          <a href="#" className="text-primar">
                            Social Order
                          </a>
                        </td>
                        <td>10-50</td>
                        <td>
                          <span className="badge bg-danger">Rejected</span>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <a href="#">5</a>
                        </th>
                        <td>Raheem Lehner</td>
                        <td>
                          <a href="#" className="text-primary">
                            Disaster
                          </a>
                        </td>
                        <td>100-500</td>
                        <td>
                          <span className="badge bg-success">Approved</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card">
            <div className="filter">
              <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <li className="dropdown-header text-start">
                  <h6>Filter</h6>
                </li>
                <li><a className="dropdown-item" href="#">Today</a></li>
                <li><a className="dropdown-item" href="#">This Month</a></li>
                <li><a className="dropdown-item" href="#">This Year</a></li>
              </ul>
            </div>
            <div className="card-body">
              <h5 className="card-title">Recent Activity <span>| Today</span></h5>
              <div className="activity">
                <div className="activity-item d-flex">
                  <div className="activite-label">32 min</div>
                  <i className='bi bi-circle-fill activity-badge text-success align-self-start'></i>
                  <div className="activity-content">
                    Employee <a href="#" className="fw-bold text-dark">John Mark</a> added
                  </div>
                </div>
                <div className="activity-item d-flex">
                  <div className="activite-label">56 min</div>
                  <i className='bi bi-circle-fill activity-badge text-danger align-self-start'></i>
                  <div className="activity-content">
                    Employee <a href="#" className="fw-bold text-dark">Sivam Dube</a> donated 20,000
                  </div>
                </div>
                <div className="activity-item d-flex">
                  <div className="activite-label">2 hrs</div>
                  <i className='bi bi-circle-fill activity-badge text-primary align-self-start'></i>
                  <div className="activity-content">
                    Employee <a href="#" className="fw-bold text-dark">Bikash Sarangi</a> added
                  </div>
                </div>
                <div className="activity-item d-flex">
                  <div className="activite-label">1 day</div>
                  <i className='bi bi-circle-fill activity-badge text-info align-self-start'></i>
                  <div className="activity-content">
                    Tempore autem saepe <a href="#" className="fw-bold text-dark">occaecati voluptatem</a> tempore
                  </div>
                </div>
                <div className="activity-item d-flex">
                  <div className="activite-label">2 days</div>
                  <i className='bi bi-circle-fill activity-badge text-warning align-self-start'></i>
                  <div className="activity-content">
                    Est sit eum reiciendis exercitationem
                  </div>
                </div>
                <div className="activity-item d-flex">
                  <div className="activite-label">4 weeks</div>
                  <i className='bi bi-circle-fill activity-badge text-muted align-self-start'></i>
                  <div className="activity-content">
                    Dicta dolorem harum nulla eius. Ut quidem quidem sit quas
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>)
}
export default CorporateDashboard;
