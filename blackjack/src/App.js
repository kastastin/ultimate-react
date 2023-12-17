import { useState, useEffect } from "react";
import WalletIcon from "./img/wallet.svg";

const cards = [
  2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9,
  9, 9, 10, 10, 10, 10, 11, 11, 11, 11,
];

// const cards = [2, 2, 3, 2, 2, 3, 2, 2, 2, 2, 2, 3, 2, 2];
// const cards = [10, 11, 10, 11, 10, 11, 10, 11, 10, 11, 10, 11, 10, 11];

function shuffleArray(arr) {
  const shuffledArray = arr.slice();
  shuffledArray.sort(() => Math.random() - 0.5);
  return shuffledArray.slice(0, 10);
}

export default function App() {
  const [bet, setBet] = useState("");
  const [cash, setCash] = useState(25);

  // bet, NEcash, game, dillerTurn win, lose, draw
  const [gameStatus, setGameStatus] = useState("bet");
  const [dillerCards, setDillerCards] = useState(new Array(5).fill(0));
  const [userCards, setUserCards] = useState(new Array(5).fill(0));
  const [shuffledCards, setShuffledCards] = useState(shuffleArray(cards)); // 10 cards

  const dillerSum = getSum(dillerCards);
  const userSum = getSum(userCards);

  useEffect(() => {
    const isDillerFirstWin =
      [21, 22].includes(dillerSum) && dillerCards.indexOf(0) === 2;
    const isUserFirstWin =
      [21, 22].includes(userSum) && userCards.indexOf(0) === 2;

    if (isDillerFirstWin && isUserFirstWin) {
      setGameStatus("draw");
      return;
    }

    if (isDillerFirstWin) {
      setGameStatus("lose");
      return;
    }

    if (isUserFirstWin) {
      setGameStatus("win");
      return;
    }

    if (userSum > 21 && !isUserFirstWin) {
      setGameStatus("lose");
      return;
    }

    if (dillerSum > 21 && !isDillerFirstWin) {
      setGameStatus("win");
      return;
    }

    if (userCards.indexOf(0) === -1) {
      setGameStatus("dillerTurn");
      return;
    }

    if (gameStatus === "dillerTurn" && dillerSum < 17) {
      displayCard("diller");
      return;
    }

    if (gameStatus === "dillerTurn" && dillerSum < 17) {
      displayCard("diller");
      return;
    }

    // copy from useEffect [gameStatus]
    if (gameStatus === "dillerTurn" && dillerSum >= 17) {
      if (dillerSum === userSum) {
        setGameStatus("draw");
      } else if (dillerSum > userSum) {
        setGameStatus("lose");
      } else if (dillerSum < userSum) {
        setGameStatus("win");
      }
    }
  }, [dillerCards, userCards]);

  useEffect(() => {
    if (gameStatus === "dillerTurn" && dillerSum < 17) {
      displayCard("diller");
      return;
    }

    if (gameStatus === "dillerTurn" && dillerSum >= 17) {
      if (dillerSum === userSum) {
        setGameStatus("draw");
      } else if (dillerSum > userSum) {
        setGameStatus("lose");
      } else if (dillerSum < userSum) {
        setGameStatus("win");
      }
    }

    // Bet logic
    if (gameStatus === "win") setCash((cash) => cash + bet * 2);
    if (gameStatus === "draw") setCash((cash) => cash + bet);
  }, [gameStatus]);

  function handleBet(value) {
    const input = parseInt(value, 10);
    const isBetValid = checkBetInput(input);
    setBet(isBetValid ? input : bet);
  }

  function resetGame() {
    setBet("");
    setGameStatus("bet");
    setDillerCards(new Array(5).fill(0));
    setUserCards(new Array(5).fill(0));
    setShuffledCards(shuffleArray(cards));
  }

  function displayCard(player) {
    let lastShuffledCard;

    setShuffledCards((cards) => {
      const updatedCards = [...cards];
      lastShuffledCard = updatedCards.pop();
      return updatedCards;
    });

    player === "diller" && setDillerCards((cards) => getCard(cards));
    player === "user" && setUserCards((cards) => getCard(cards));

    function getCard(cards) {
      const zeroIndex = cards.indexOf(0);
      const updatedCards = cards.slice();
      updatedCards.splice(zeroIndex, 1, lastShuffledCard);
      return updatedCards;
    }
  }

  return (
    <div className="app">
      <Wallet cash={cash} />
      <GameBoard dillerCards={dillerCards} userCards={userCards} />

      {["bet", "NEcash"].includes(gameStatus) && (
        <BetInput
          bet={bet}
          setBet={handleBet}
          cash={cash}
          setCash={setCash}
          gameStatus={gameStatus}
          setGameStatus={setGameStatus}
          displayCard={displayCard}
          resetGame={resetGame}
        />
      )}

      {gameStatus === "game" && (
        <UserOption displayCard={displayCard} setGameStatus={setGameStatus} />
      )}

      <Message status={gameStatus} resetGame={resetGame} />
    </div>
  );
}

function Message({ status, resetGame }) {
  const isMessageHidden = ["bet", "game", "dillerTurn"].includes(status);

  return (
    <>
      {isMessageHidden ? (
        ""
      ) : (
        <form className="overlay-message" onSubmit={resetGame}>
          <span className="message">{status}</span>
          <button autoFocus className="btn--message">
            OK
          </button>
        </form>
      )}
    </>
  );
}

function Wallet({ cash }) {
  return (
    <div className="wallet-info">
      <div className="wallet-info__wrapper">
        <img src={WalletIcon} alt="Wallet icon" />
        <span>{cash}$</span>
      </div>
    </div>
  );
}

function GameBoard({ dillerCards, userCards }) {
  const dillerPoints = getSum(dillerCards);
  const userPoints = getSum(userCards);

  return (
    <div className="game-board">
      <div className="game-board__wrapper">
        <div className="board">
          <div className="board__header">
            <span className="title">Diller</span>
            <span className="points">{dillerPoints}</span>
          </div>
          <div className="cards">
            {dillerCards.map((num) => (
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
            {userCards.map((num) => (
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
  setBet,
  cash,
  setCash,
  gameStatus,
  setGameStatus,
  displayCard,
  resetGame,
}) {
  function handleSubmit(e) {
    e.preventDefault();

    if (bet === "") resetGame();
    else if (cash < bet) setGameStatus("NEcash"); // Not enough cash
    else {
      setGameStatus("game");
      setCash((cash) => cash - bet);
      displayCard("diller");
      displayCard("diller");
      displayCard("user");
      displayCard("user");
    }
  }

  return (
    <div className="form-wrapper">
      <form className="bet-form" onSubmit={handleSubmit}>
        <div className="bet-form__option-btns">
          <div className="btn" onClick={() => setBet(5)}>
            Min
          </div>
          <div className="btn" onClick={() => setBet(bet * 2)}>
            X2
          </div>
          <div className="btn" onClick={() => setBet(bet / 2)}>
            X/2
          </div>
          <div className="btn" onClick={() => setBet(1000)}>
            Max
          </div>
        </div>
        <input
          type="number"
          placeholder="5 - 1000"
          autoFocus={gameStatus === "bet"}
          disabled={gameStatus === "NEcash"}
          value={bet}
          onChange={(e) => setBet(e.target.value)}
        />
        <button>Make a bet</button>
      </form>
    </div>
  );
}

function UserOption({ displayCard, setGameStatus }) {
  return (
    <div className="form-wrapper">
      <div className="option__btns">
        <div className="btn" onClick={() => displayCard("user")}>
          Hit
        </div>
        <div className="btn" onClick={() => setGameStatus("dillerTurn")}>
          Stop
        </div>
      </div>
    </div>
  );
}

function checkBetInput(input) {
  return (
    !Number.isNaN(input) &&
    Number.isFinite(input) &&
    input >= 5 &&
    input <= 1000
  );
}

function getSum(arr) {
  return arr.reduce((acc, curr) => acc + curr);
}
