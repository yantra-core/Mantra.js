let config = {};
config.env = 'dev';
config.debug = false;
config.deltaCompression = false; // Toggle this to enable delta compression
config.isClientSidePredictionEnabled = false;  // Set to false to disable client-side prediction
config.isServerSideReconciliationEnabled = false;  // Set to false to disable server-side reconciliation

export default config;