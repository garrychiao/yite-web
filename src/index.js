import { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from 'setup/reportWebVitals';
import setupI18n from 'setup/setupI18n';
import setupAxios from 'setup/setupAxios';
import { AuthProvider, createRefresh } from 'react-auth-kit';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { authApi } from 'page/api';
// import 'antd/dist/antd.variable.min.css';
// import '@ant-design/pro-form/dist/form.css';
// import '@ant-design/pro-card/dist/card.css';

const App = lazy(() => import('./App'));


(async () => {
  // setupLog();
  // setupFirebase();
  setupAxios();
  await setupI18n();


  // const refreshApi = createRefresh({
  //   // interval: 60,   // Refreshs the token in every 10 minutes
  //   refreshApiCallback: async (
  //     {   // arguments
  //       authToken,
  //       authTokenExpireAt,
  //       refreshToken,
  //       refreshTokenExpiresAt,
  //       authUserState
  //     }) => {
  //     try {
  //       const response = await authApi.getMe({ refreshToken })
  //       console.log(`response`)
  //       console.log(response)
  //       return {
  //         isSuccess: true,
  //         newAuthToken: response.data.token,
  //         newAuthTokenExpireIn: 10,
  //         newRefreshTokenExpiresIn: 60
  //       }
  //     }
  //     catch (error) {
  //       console.error(error)
  //       return {
  //         isSuccess: false
  //       }
  //     }
  //   }
  // })

  ReactDOM.render(
    <AuthProvider
      authType={'localstorage'}
      authName={'_auth'}
      // refresh={refreshApi}
    >
      <Router>
        <Suspense fallback={null}>
          <App />
        </Suspense>
      </Router>
    </AuthProvider>
    ,
    document.getElementById('root')
  );
})();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
