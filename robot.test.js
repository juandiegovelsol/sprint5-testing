const { createRobot } = require("./robot.js");

describe("Get position", () => {
  it("Should get actual robot position", () => {
    expect(createRobot(0, 0, "S").getPosition()).toMatchObject({
      x: 0,
      y: 0,
      direction: "S",
    });
    expect(createRobot().getPosition()).toMatchObject({
      x: 7,
      y: 3,
      direction: "N",
    });
  });
});

describe("Advance", () => {
  it("should move robot forward heading to North", () => {
    const robot = createRobot(7, 3, "N");
    robot.advance();
    expect(robot.getPosition()).toMatchObject({
      x: 7,
      y: 4,
      direction: "N",
    });
  });
  it("should move robot forward heading to East", () => {
    const robot = createRobot(7, 3, "E");
    robot.advance();
    expect(robot.getPosition()).toMatchObject({
      x: 8,
      y: 3,
      direction: "E",
    });
  });
  it("should move robot forward heading to South", () => {
    const robot = createRobot(7, 3, "S");
    robot.advance();
    expect(robot.getPosition()).toMatchObject({
      x: 7,
      y: 2,
      direction: "S",
    });
  });
  it("should move robot forward heading to West", () => {
    const robot = createRobot(7, 3, "W");
    robot.advance();
    expect(robot.getPosition()).toMatchObject({
      x: 6,
      y: 3,
      direction: "W",
    });
  });
});

describe("Turn right", () => {
  it("should turn robot right heading to East", () => {
    const robot = createRobot(7, 3, "N");
    robot.turnRight();
    expect(robot.getPosition()).toMatchObject({
      x: 8,
      y: 3,
      direction: "E",
    });
  });
  it("should turn robot right heading to South", () => {
    const robot = createRobot(7, 3, "E");
    robot.turnRight();
    expect(robot.getPosition()).toMatchObject({
      x: 7,
      y: 2,
      direction: "S",
    });
  });
  it("should turn robot right heading to West", () => {
    const robot = createRobot(7, 3, "S");
    robot.turnRight();
    expect(robot.getPosition()).toMatchObject({
      x: 6,
      y: 3,
      direction: "W",
    });
  });
  it("should turn robot right heading to North", () => {
    const robot = createRobot(7, 3, "W");
    robot.turnRight();
    expect(robot.getPosition()).toMatchObject({
      x: 7,
      y: 4,
      direction: "N",
    });
  });
});
describe("Turn left", () => {
  it("should turn robot right heading to West", () => {
    const robot = createRobot(7, 3, "N");
    robot.turnLeft();
    expect(robot.getPosition()).toMatchObject({
      x: 6,
      y: 3,
      direction: "W",
    });
  });
  it("should turn robot right heading to South", () => {
    const robot = createRobot(7, 3, "W");
    robot.turnLeft();
    expect(robot.getPosition()).toMatchObject({
      x: 7,
      y: 2,
      direction: "S",
    });
  });
  it("should turn robot right heading to East", () => {
    const robot = createRobot(7, 3, "S");
    robot.turnLeft();
    expect(robot.getPosition()).toMatchObject({
      x: 8,
      y: 3,
      direction: "E",
    });
  });
  it("should turn robot right heading to North", () => {
    const robot = createRobot(7, 3, "E");
    robot.turnLeft();
    expect(robot.getPosition()).toMatchObject({
      x: 7,
      y: 4,
      direction: "N",
    });
  });
});

describe("Combined robot moving", () => {
  it("Should move robot forward, then turn rigth heading East", () => {
    const robot = createRobot(7, 3, "N");
    robot.instructions("AR");
    expect(robot.getPosition()).toMatchObject({
      x: 8,
      y: 4,
      direction: "E",
    });
  });
  it("Should move robot following this instructions: RAALAL", () => {
    const robot = createRobot(7, 3, "N");
    robot.instructions("RAALAL");
    expect(robot.getPosition()).toMatchObject({
      x: 9,
      y: 5,
      direction: "W",
    });
  });
  it("Should throw error because of invalid instruction", () => {
    expect(() => {
      const robot = createRobot(7, 3, "N");
      robot.instructions("D");
    }).toThrow("Invalid character");
  });
  it("Should throw error because of robot moving forward out of boundaries", () => {
    expect(() => {
      const robot = createRobot(7, 10, "N");
      robot.instructions("A");
    }).toThrow("Robot moving out of boundaries");
    expect(() => {
      const robot = createRobot(10, 3, "E");
      robot.instructions("A");
    }).toThrow("Robot moving out of boundaries");
    expect(() => {
      const robot = createRobot(10, 0, "S");
      robot.instructions("A");
    }).toThrow("Robot moving out of boundaries");
    expect(() => {
      const robot = createRobot(0, 3, "W");
      robot.instructions("A");
    }).toThrow("Robot moving out of boundaries");
  });
  it("Should throw error because of robot turning right out of boundaries", () => {
    expect(() => {
      const robot = createRobot(10, 3, "N");
      robot.instructions("R");
    }).toThrow("Robot moving out of boundaries");
    expect(() => {
      const robot = createRobot(7, 0, "E");
      robot.instructions("R");
    }).toThrow("Robot moving out of boundaries");
    expect(() => {
      const robot = createRobot(0, 3, "S");
      robot.instructions("R");
    }).toThrow("Robot moving out of boundaries");
    expect(() => {
      const robot = createRobot(7, 10, "W");
      robot.instructions("R");
    }).toThrow("Robot moving out of boundaries");
  });
  it("Should throw error because of robot turning left out of boundaries", () => {
    expect(() => {
      const robot = createRobot(0, 3, "N");
      robot.instructions("L");
    }).toThrow("Robot moving out of boundaries");
    expect(() => {
      const robot = createRobot(7, 10, "E");
      robot.instructions("L");
    }).toThrow("Robot moving out of boundaries");
    expect(() => {
      const robot = createRobot(10, 3, "S");
      robot.instructions("L");
    }).toThrow("Robot moving out of boundaries");
    expect(() => {
      const robot = createRobot(7, 0, "W");
      robot.instructions("L");
    }).toThrow("Robot moving out of boundaries");
  });
  it("Should throw error because of robot excecuting movements string out of boundaries", () => {
    expect(() => {
      const robot = createRobot(7, 3, "N");
      robot.instructions("RAAA");
    }).toThrow("Robot moving out of boundaries");
  });
});
