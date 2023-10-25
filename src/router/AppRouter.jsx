import { Route, Routes } from "react-router-dom";
import LoginPage from "../LoginPage";
import { useLoginCheck } from "../hooks/useLoginCheck";
import { useMemo } from "react";
import { LoadExcel } from "../components/LoadExcel/LoadExcel";
import { CartolaHistorica } from "../components/CartolaHistorica/CartolaHistorica";
import { CategoryManager } from "../components/CategoryManager/CategoryManager";

  

export const AppRouter = () => {

  const loginState  = useLoginCheck()

  useMemo( () => {
    if ( localStorage.getItem('token') ) loginState.refetch()
  }, [])

  return  (
    <Routes>
        <Route path="/load-excel"         element={ <LoadExcel /> } />
        <Route path="/cartola-historica"  element={ <CartolaHistorica /> } />
        <Route path="/category-manager"  element={ <CategoryManager /> } />
        {/* <Route path="/main"             element={ <MainLayout /> } /> */}
        <Route path="/login"              element={ <LoginPage /> } />
        {/* <Route path="/settings"         element={ <Settings /> } />
        <Route path="/availabledates"   element={ <AvailableDates /> } />
        <Route path="/dimmanager"       element={ <DimManager /> } />*/}
        <Route path="/*"                  element={ <LoadExcel /> } /> 
    </Routes>
)}