exports.createRobot = (xStart = 7, yStart = 3, direction = "N") => {
  let x = xStart;
  let y = yStart;
  let orientation = direction;

  const advance = () => {
    if (orientation === "N") {
      y++;
    }
    if (orientation === "E") {
      x++;
    }
    if (orientation === "S") {
      y--;
    }
    if (orientation === "W") {
      x--;
    }
  };

  const turnRight = () => {
    if (orientation === "N") {
      x++;
      orientation = "E";
    } else if (orientation === "E") {
      y--;
      orientation = "S";
    } else if (orientation === "S") {
      x--;
      orientation = "W";
    } else if (orientation === "W") {
      y++;
      orientation = "N";
    }
  };

  const turnLeft = () => {
    if (orientation === "N") {
      x--;
      orientation = "W";
    } else if (orientation === "E") {
      y++;
      orientation = "N";
    } else if (orientation === "S") {
      x++;
      orientation = "E";
    } else if (orientation === "W") {
      y--;
      orientation = "S";
    }
  };

  const instructions = (instruction) => {
    const array = instruction.split("");
    array.forEach((element) => {
      if (element === "A") {
        if (
          (orientation === "N" && y === 10) ||
          (orientation === "E" && x === 10) ||
          (orientation === "S" && y === 0) ||
          (orientation === "W" && x === 0)
        ) {
          throw new TypeError("Robot moving out of boundaries");
        } else {
          advance();
        }
      } else if (element === "R") {
        if (
          (orientation === "N" && x === 10) ||
          (orientation === "E" && y === 0) ||
          (orientation === "S" && x === 0) ||
          (orientation === "W" && y === 10)
        ) {
          throw new TypeError("Robot moving out of boundaries");
        } else {
          turnRight();
        }
      } else if (element === "L") {
        if (
          (orientation === "N" && x === 0) ||
          (orientation === "E" && y === 10) ||
          (orientation === "S" && x === 10) ||
          (orientation === "W" && y === 0)
        ) {
          throw new TypeError("Robot moving out of boundaries");
        } else {
          turnLeft();
        }
      } else {
        throw new TypeError("Invalid character");
      }
    });
  };

  const getPosition = () => {
    return { x: x, y: y, direction: orientation };
  };
  return {
    advance,
    turnRight,
    turnLeft,
    getPosition,
    instructions,
  };
};
