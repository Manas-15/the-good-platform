import React, { useState, useEffect } from "react";
import { payrollConstants } from "./../constants";
import { payrollService } from "./../services";
import { alertActions } from "./";

export const payrollBatchActions = {
  getPayrollBatch,
  operateActionRequest,
  processBatch,
};

function getPayrollBatch(data) {
  return (dispatch) => {
    dispatch(request());
    payrollService.getPayrollBatch(data).then(
      (batches) => dispatch(success(batches)),

      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
  function request(data) {
    return {
      type: payrollConstants.GET_PAYROLL_BATCH_REQUEST,
    };
  }
  function success(batches) {
    return {
      type: payrollConstants.GET_PAYROLL_BATCH_SUCCESS,
      batches,
    };
  }
  function failure(error) {
    return {
      type: payrollConstants.GET_PAYROLL_BATCH_FAILURE,
      error,
    };
  }
}

function operateActionRequest(actionValues) {
  return (dispatch) => {
    dispatch(request(actionValues));
  };

  function request(preference) {
    return {
      type: payrollConstants.GET_PAYROLL_SETTING_ACTION_REQUEST,
      preference,
    };
  }
}

function processBatch(data) {
  return (dispatch) => {
    dispatch(request(data));
    payrollService.processBatch(data).then(
      (batch) => dispatch(success(batch)),
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
  function request(data) {
    return {
      type: payrollConstants.PROCESS_BATCH_REQUEST,
      data,
    };
  }
  function success(preferences) {
    return {
      type: payrollConstants.PROCESS_BATCH_SUCCESS,
      preferences,
    };
  }
  function failure(error) {
    return {
      type: payrollConstants.PROCESS_BATCH_FAILURE,
      error,
    };
  }
}
