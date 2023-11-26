import '../scss/_fonts.scss';
import '../scss/_styles.scss';

import './polyfills';

import React from 'react';
import ReactDOM from "react-dom/client"
// import AuthProvider from './providers/AuthProvider';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { CookiesProvider } from 'react-cookie';

import { RouterProvider } from 'react-router-dom';
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react'

import { Provider } from 'react-redux';
import { store } from './store/store';
import { router } from './components/ui/router';
// import { persistor } from './store/store';

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      },
    },
});

ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                    <Provider store={store}>
                        {/* <PersistGate persistor={persistor}> */}
                            <RouterProvider router={router}/>
                        {/* </PersistGate> */}
                    </Provider>
             </QueryClientProvider>
        </React.StrictMode>
)