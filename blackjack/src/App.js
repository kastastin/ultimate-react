import { useState, useEffect } from "react";
import WalletIcon from "./img/wallet.svg";

export default function App() {
  const cards = [
    2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9,
    9, 9, 9, 10, 10, 10, 10, 11, 11, 11, 11,
  ];

  const initGameInfo = {
    diller: new Array(5).fill(0),
    user: new Array(5).fill(0),
  };

  function shuffleArray(arr) {
    const shuffledArray = arr.slice();
    shuffledArray.sort(() => Math.random() - 0.5);
    return shuffledArray.slice(0, 10);
  }

  const [cash, setCash] = useState(25);
  const [bet, setBet] = useState("");
  const [isGameActive, setIsGameActive] = useState(false);
  const [shuffledCards, setShuffledCards] = useState([]);
  const [gameInfo, setGameInfo] = useState(initGameInfo);
  const [isDillerTurn, setIsDillerTurn] = useState(false);

  useEffect(() => {
    setShuffledCards(shuffleArray(cards));
  }, []);

  useEffect(() => {
    let message;

    const isFirstTurn = {
      diller: gameInfo.diller.filter((num) => num === 0).length === 3,
      user: gameInfo.user.filter((num) => num === 0).length === 3,
    };

    // User has 21 or 22 immediately
    const userImmediatelyWin =
      (getSum(gameInfo.user) === 21 || getSum(gameInfo.user) === 22) &&
      isFirstTurn.user;

    // Diller has 21 or 22 immediately
    const dillerImmediatelyWin =
      (getSum(gameInfo.diller) === 21 || getSum(gameInfo.diller) === 22) &&
      isFirstTurn.diller;

    // Immediately draw
    const drawImmediately = userImmediatelyWin && dillerImmediatelyWin;

    const immediatelyResult =
      userImmediatelyWin || dillerImmediatelyWin || drawImmediately;

    if (userImmediatelyWin) message = `You win ${bet * 2}`;
    if (dillerImmediatelyWin) message = "You lose";
    if (drawImmediately) message = "It's draw";

    // Immediately 21 or 22
    if (shuffledCards.length === 6 && immediatelyResult) displayResult(message);

    // User > 21
    if (getSum(gameInfo.user) > 21) displayResult("You lose");
  }, [gameInfo]);

  function displayResult(message) {
    setTimeout(() => {
      const confirm = window.confirm(message);
      if (confirm || !confirm) restartGame(message);
    }, 0);
  }

  function restartGame(result) {
    if (result.includes("win")) setCash((cash) => cash + bet * 2);
    if (result.includes("draw")) setCash((cash) => cash + bet);

    setBet("");
    setIsGameActive(false);
    setGameInfo(initGameInfo);
    setShuffledCards(shuffleArray(cards));
  }

  function takeCard(player) {
    let lastShuffledCard;

    // User took all 5 cards
    if (gameInfo.user.indexOf(0) === -1) return;

    setShuffledCards((cards) => {
      const updatedCards = [...cards];
      lastShuffledCard = updatedCards.pop();
      return updatedCards;
    });

    setGameInfo((info) => {
      const zeroIndex = info[player].indexOf(0);

      const updatedInfo = info[player].slice();
      updatedInfo.splice(zeroIndex, 1, lastShuffledCard);

      return {
        ...info,
        [player]: updatedInfo,
      };
    });
  }

  function handleBet(value) {
    const parsedValue = parseInt(value, 10);

    setBet(
      !Number.isNaN(parsedValue) &&
        Number.isFinite(parsedValue) &&
        parsedValue >= 5 &&
        parsedValue <= 1000
        ? parsedValue
        : bet
    );
  }

  return (
    <div className="app">
      <WalletInfo cash={cash} />
      <GameBoard gameInfo={gameInfo} />
      <BetInput
        bet={bet}
        onBet={handleBet}
        cash={cash}
        onCash={setCash}
        isGameActive={isGameActive}
        onIsGameActive={setIsGameActive}
        takeCard={takeCard}
        onIsDillerTurn={setIsDillerTurn}
      />
    </div>
  );
}

function WalletInfo({ cash }) {
  return (
    <div className="wallet-info">
      <div className="wallet-info__wrapper">
        <img src={WalletIcon} alt="Wallet icon" />
        <span>{cash}$</span>
      </div>
    </div>
  );
}

function GameBoard({ gameInfo }) {
  const dillerPoints = getSum(gameInfo.diller);
  const userPoints = getSum(gameInfo.user);

  return (
    <div className="game-board">
      <div className="game-board__wrapper">
        <div className="board">
          <div className="board__header">
            <span className="title">Diller</span>
            <span className="points">{dillerPoints}</span>
          </div>
          <div className="cards">
            {gameInfo.diller.map((num) => (
              <Card key={crypto.randomUUID()}>{num}</Card>
            ))}
          </div>
        </div>

        <div className="board">
          <div className="board__header">
            <span className="title">User</span>
            <span className="points">{userPoints}</span>
          </div>
          <div className="cards">
            {gameInfo.user.map((num) => (
              <Card key={crypto.randomUUID()}>{num}</Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ children }) {
  return <div className="card">{children !== 0 ? children : ""}</div>;
}

function BetInput({
  bet,
  onBet,
  cash,
  onCash,
  isGameActive,
  onIsGameActive,
  takeCard,
  onIsDillerTurn,
}) {
  function handleSubmit(e) {
    e.preventDefault();

    if (cash < bet) alert("Not enough money");
    else {
      onCash(cash - bet);
      onIsGameActive(true);
      takeCard("diller");
      takeCard("diller");
      takeCard("user");
      takeCard("user");
    }
  }

  return (
    <div className="bet-input">
      {isGameActive ? (
        <div className="option__btns">
          <div className="btn" onClick={() => takeCard("user")}>
            Hit
          </div>
          <div className="btn" onClick={() => onIsDillerTurn(true)}>
            Stop
          </div>
        </div>
      ) : (
        <form className="bet-input__wrapper" onSubmit={handleSubmit}>
          <div className="bet-input__option-btns">
            <div className="btn" onClick={() => onBet(5)}>
              Min
            </div>
            <div className="btn" onClick={() => onBet(bet * 2)}>
              X2
            </div>
            <div className="btn" onClick={() => onBet(bet / 2)}>
              X/2
            </div>
            <div className="btn" onClick={() => onBet(1000)}>
              Max
            </div>
          </div>
          <input
            type="number"
            placeholder="5 - 1000"
            autoFocus
            value={bet}
            onChange={(e) => onBet(e.target.value)}
          />
          <button>Make a bet</button>
        </form>
      )}
    </div>
  );
}

function getSum(arr) {
  return arr.reduce((acc, curr) => acc + curr);
}
