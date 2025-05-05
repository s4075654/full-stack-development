import {RouterProvider} from "react-router-dom";
import {router} from "./routes/AppRoutes.tsx";
import {store} from "./redux/store.ts";
import {Provider} from "react-redux";
import {useEffect} from "react";
function App() {
    useEffect(() => {
      if (typeof window !== 'undefined' && 'Worker' in window) {
        const worker = new Worker('/notificationWorker.js');
        worker.postMessage({ command: 'start' });
        return () => worker.postMessage({ command: 'stop' });
      }
    }, []);
  
    return (
            <Provider store={store}>
                <RouterProvider router={router}/>
            </Provider>
      )
  }
  
  export default App;