import React, { lazy, Suspense } from "react";

const MapWrapper = lazy(() => import("./MapWrapper"));

const LazyMapWrapper = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <MapWrapper {...props} />
  </Suspense>
);

export default LazyMapWrapper;
