import React from "react";
import Home from "../components/tradingItems";
import ProfilePage from "../components/profile";
import TradingItems from "../components/tradingItems";
import Categories from "../components/categories";

export default function PageHome() {


    // Pesdo Code
    const items = [{
        id: 2,
        src: 'https://static.wikia.nocookie.net/6d37f599-6b4a-4053-b2f3-be1bb11109ce',
        text: 'hello',
        price: 33.45,
    },
    {
        id: 3,
        src: 'https://cdn.shopify.com/s/files/1/0054/4371/5170/products/Spongebob_464pin.png?v=1627414161',
        text: 'SpongeBob SpongeBob',
        price: 325,
    },
    {
        id: 4,
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyWigdcllCbOzEpRd8kVeupSjDtkEmxMjDE-4lvcbR7HDZRdCsV4LxUfyfTrb8PMkQAEM&usqp=CAU',
        text: 'Patrick Star Patrick Star!!!!',
        price: 999,
    },
    {
        id: 5,
        src: 'https://static.wikia.nocookie.net/6d37f599-6b4a-4053-b2f3-be1bb11109ce',
        text: 'This div is for text',
        price: 0.01,
    },
    ]
    const suggests = [{
        id: 6,
        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/UCLA_Bruins_logo.svg/1200px-UCLA_Bruins_logo.svg.png',
        text: 'UCLA fight fight fight!!!',
        price: 33.45,
    },
    {
        id: 7,
        src: 'https://cdn.shopify.com/s/files/1/0054/4371/5170/products/Spongebob_464pin.png?v=1627414161',
        text: 'SpongeBob SpongeBob',
        price: 325,
    },
    {
        id: 9,
        src: 'https://static.wikia.nocookie.net/6d37f599-6b4a-4053-b2f3-be1bb11109ce',
        text: 'This div is for text',
        price: 0.01,
    },
    {
        id: 8,
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyWigdcllCbOzEpRd8kVeupSjDtkEmxMjDE-4lvcbR7HDZRdCsV4LxUfyfTrb8PMkQAEM&usqp=CAU',
        text: 'Patrick Star Patrick Star!!!!',
        price: 999,
    },
    ]

    return (
      <div className="flex flex-row">
        <div className="mt-63px ml-80px flex flex-col space-y-30px">
          <div>
            <div className="pl-25px avenir-med text-gray-500 text-20px mb-10px">
              Trading Items
            </div>
            <TradingItems items={items} />
          </div>
          <Categories />
          <div>
            <div className="pl-25px avenir-med text-gray-500 text-20px mb-10px">
              Suggestions
            </div>
            <TradingItems items={suggests} />
          </div>
        </div>
        <div className="w-357px h-817px mt-20px ml-40px mr-80px bg-white pr-25px pl-25px flex flex-row justify-between rounded-25px">
          <ProfilePage />
        </div>
      </div>
    );
}