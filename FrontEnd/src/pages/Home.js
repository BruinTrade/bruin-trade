import React from "react";
import Home from "../components/tradingItems";
import { NewProfilePage } from "../components/profile";
import TradingItems from "../components/tradingItems";
import Categories from "../components/categories";
import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux'

export default function PageHome() {
  // const login = useSelector((state) => state.loginStatus.login)
  // if (!login) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <div className="flex flex-row justify-center">
      <div className="mt-63px flex flex-col space-y-30px">
        <div>
          <div className="pl-25px avenir-med text-gray-500 text-20px mb-10px">
            Trending Items
          </div>
          <TradingItems autoScroll={false} />
        </div>
        <Categories />
        <div>
          <div className="pl-25px avenir-med text-gray-500 text-20px mb-10px">
            Suggestions
          </div>
          <TradingItems />
        </div>
      </div>
      <div className="w-357px h-817px mt-20px ml-40px bg-white pr-25px pl-25px flex flex-row justify-center rounded-25px">
        <NewProfilePage />
      </div>
    </div>
  );
}