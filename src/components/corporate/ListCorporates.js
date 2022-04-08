import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { corporateActions } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';

const ListCorporates = () => {
  let history = useHistory();
  const corporates = useSelector(state => state.corporates);
  const user = useSelector(state => state.authentication.user);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(corporateActions.getCorporates());
  }, []);
  console.log("sssssssssssssssssss", corporates)
  return (<div>
    <div className='row mb-4'>
      <div className='col-md-6'>
        <h4>Corporates</h4>
      </div>
      <div className='col-md-6' style={{textAlign: 'right'}}>
        <button type="button" className="btn btn-primary" onClick={()=>history.push("/corporates/add")}>Add Corporate</button>
      </div>
    </div>
    {corporates.loading && <em>Loading corporates...</em>}
    <table className="table table-striped">
    <thead>
      <tr className='table-active'>
        <th scope="col">Sl#</th>
        <th scope="col">Name</th>
        <th className='text-right'>Donation Raised</th>
        <th className='text-center'>Number of Users</th>
        <th scope="col">Start Date</th>
        <th scope="text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
    {corporates.items && corporates.items.length > 0
    ?
        corporates.items.map((corporate, index) =>
          <tr key={corporate.id}>
            <td scope="row">1</td>
            <td>{corporate.organizationName}</td>
            <td className='text-right'>0</td>
            <td className='text-center'>{corporate.organizationSize ? corporate.organizationSize : 0}</td>
            <td>05/03/22</td>
            <td>
              <span className="bi-check-circle fs-5 cursor-pointer"></span>
              <span className="bi-x-circle fs-5 ml-2 cursor-pointer"></span>
            </td>
          </tr>
        )
        :
        <tr>
          <td colspan="6" className='text-center'>No corporates found</td>
        </tr>
      }
    </tbody>
  </table>
  <div className='row mb-4'>
    <div className='col-md-6'>
      <p>Showing 1 to 10 of 20 records</p>
    </div>
    <div className='col-md-6' style={{textAlign: 'right'}}>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item"><a className="page-link" href="#">Previous</a></li>
          <li className="page-item"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item"><a className="page-link" href="#">Next</a></li>
        </ul>
      </nav>
    </div>
  </div>    
</div>)
}
export default ListCorporates;