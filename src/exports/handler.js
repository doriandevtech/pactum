const { PactumHandlerError } = require('../helpers/errors');
const config = require('../config');

const expectHandlers = {};
const retryHandlers = {};
const returnHandlers = {};
const stateHandlers =  {};
const dataHandlers = {};

const handler = {

  addExpectHandler(name, func) {
    isValidHandler(name, func);
    expectHandlers[name] = func;
  },

  getExpectHandler(name) {
    if (expectHandlers[name]) return expectHandlers[name];
    throw new PactumHandlerError(`Custom Expect Handler Not Found - ${name}`);
  },

  addRetryHandler(name, func) {
    isValidHandler(name, func);
    retryHandlers[name] = func;
  },

  getRetryHandler(name) {
    if (retryHandlers[name]) return retryHandlers[name];
    throw new PactumHandlerError(`Custom Retry Handler Not Found - ${name}`);
  },

  addReturnHandler(name, func) {
    isValidHandler(name, func);
    returnHandlers[name] = func;
  },

  getReturnHandler(name) {
    return returnHandlers[name];
  },

  addStateHandler(name, func) {
    isValidHandler(name, func);
    stateHandlers[name] = func;
  },

  getStateHandler(name) {
    if (stateHandlers[name]) return stateHandlers[name];
    throw new PactumHandlerError(`Custom State Handler Not Found - ${name}`);
  },

  addDataHandler(name, func) {
    isValidHandler(name, func);
    dataHandlers[name] = func;
    config.data.ref.fun.enabled = true;
  },

  getDataHandler(name) {
    if (dataHandlers[name]) return dataHandlers[name];
    throw new PactumHandlerError(`Custom Data Handler Not Found - ${name}`);
  },

}

function isValidHandler(name, func) {
  if (typeof name !== 'string' || name === '') {
    throw new PactumHandlerError('`name` is required');
  }
  if (typeof func !== 'function') {
    throw new PactumHandlerError('`func` is required');
  }
}

module.exports = handler;