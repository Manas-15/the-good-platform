import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { corporateActions } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import corporates from './../../config/corporates.json';

const ListCorporates = () => {
  let history = useHistory();
  // const corporates = useSelector(state => state.corporates);
  const user = useSelector(state => state.authentication.user);
  const dispatch = useDispatch();

  // useEffect(() => {
  //     dispatch(corporateActions.getCorporates());
  // }, []);
  return (<div>
    <div className='row mb-4'>
      <div className='col-md-6'>
        <h4>Corporates</h4>
      </div>
      <div className='col-md-6' style={{textAlign: 'right'}}>
        <button type="button" className="btn btn-primary" onClick={()=>history.push("/corporates/add")}>Add Corporate</button>
      </div>
    </div>
    {/* {corporates.loading && <em>Loading corporates...</em>} */}
    <table className="table table-striped">
    <thead>
      <tr className='table-active'>
        <th scope="col">Sl#</th>
        <th scope="col">Name</th>
        <th>Size</th>
        <th>Type</th>
        <th scope="col">Address</th>
        <th className="text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
    {
    // corporates.items && corporates.items.length > 0
    // ?
        corporates.map((corporate, index) =>
          <tr key={index}>
            <td scope="row">{index+1}</td>
            <td>{corporate.name}</td>
            <td>{corporate.size}</td>
            <td>{corporate.type}</td>
            <td>{corporate.address.split(',').reduce((all, cur) => [
                ...all,
                <br/>,
                cur
              ])}</td>
            <td className="text-center">
              
              <div className="dropdown">
                  <span className="bi-three-dots"></span>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <a className="dropdown-item" href="#">Something else here</a>
                  </div>
              </div>
            </td>
          </tr>
        )
        // :
        // <tr>
        //   <td colSpan="6" className='text-center'>No corporates found</td>
        // </tr>
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
  <div id="myModal" className="modal fade">
    <div className="modal-dialog modal-confirm">
      <div className="modal-content">
        <div className="modal-header flex-column">
          <div className="icon-box">
            <i className="material-icons">&#xE5CD;</i>
          </div>						
          <h4 className="modal-title w-100">Are you sure?</h4>	
          <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        </div>
        <div className="modal-body">
          <p>Do you really want to delete these records? This process cannot be undone.</p>
        </div>
        <div className="modal-footer justify-content-center">
          <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
          <button type="button" className="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>
  </div>     
</div>)
}
export default ListCorporates;