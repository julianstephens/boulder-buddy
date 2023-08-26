import dayjs from "dayjs";
import {
  Prisma,
  PrismaClient,
  CycleSchema,
  ExerciseType,
  RoutineType,
} from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  // await prisma.note.deleteMany({});
  // await prisma.exercise.deleteMany({});
  // await prisma.routine.deleteMany({});
  await prisma.trainingDay.deleteMany({});
  // await prisma.microcycle.deleteMany({});
  // await prisma.mesocycle.deleteMany({});

  const meso = await prisma.mesocycle.create({
    data: {
      goal: "Increase session avg to V5",
      startDate: dayjs().unix(),
      endDate: dayjs().add(24, "w").unix(),
      isActive: true,
      user: {
        connect: {
          email: "julianstephens55@gmail.com",
        },
      },
    },
  });

  const micro = await prisma.microcycle.create({
    data: {
      goal: "Boulder V4 at >= 45 deg",
      startDate: dayjs().unix(),
      endDate: dayjs().add(6, "w").unix(),
      schema: CycleSchema.BOULDER_GAIN,
      mesocycle: {
        connect: {
          id: meso.id,
        },
      },
    },
  });

  const exercises = [
    {
      name: "2nd Tier Bouldering",
      type: ExerciseType.CLIMBING_SESSION,
      equipment: "NONE",
    },
    {
      name: "3 Try Board Circuit",
      type: ExerciseType.CLIMBING_SESSION,
      equipment: "NONE",
    },
    {
      name: "Limit Bouldering",
      type: ExerciseType.CLIMBING_SESSION,
      equipment: "NONE",
    },
    {
      name: "Weakness Practice",
      type: ExerciseType.CLIMBING_DRILL,
      equipment: "NONE",
    },
    {
      name: "Rooting and Dead Stops",
      type: ExerciseType.CLIMBING_DRILL,
      equipment: "NONE",
    },
    {
      name: "Pullups",
      type: ExerciseType.BODYWEIGHT,
      equipment: "NONE",
    },
    {
      name: "Scapular Pullups",
      type: ExerciseType.BODYWEIGHT,
      equipment: "NONE",
    },
    {
      name: "Power Pullups",
      type: ExerciseType.BODYWEIGHT,
      equipment: "NONE",
    },
    {
      name: "Stretching",
      type: ExerciseType.WARMUP,
      equipment: "NONE",
    },
    {
      name: "Jogging",
      type: ExerciseType.BODYWEIGHT,
      equipment: "NONE",
    },
    {
      name: "Easy Climbing",
      type: ExerciseType.CLIMBING_DRILL,
      equipment: "NONE",
      note: {
        create: {
          text: "Build up to flash level, slowly decreasing hold size and increasing difficulty",
        },
      },
    },
    {
      name: "KB Snatch",
      type: ExerciseType.WEIGHTED_REPS,
      equipment: "KETTLEBELL",
    },
    {
      name: "KB Shoulder Press",
      type: ExerciseType.WEIGHTED_REPS,
      equipment: "KETTLEBELL",
    },
    {
      name: "KB Bent-Over Row",
      type: ExerciseType.WEIGHTED_REPS,
      equipment: "KETTLEBELL",
    },
    {
      name: "KB Clean",
      type: ExerciseType.WEIGHTED_REPS,
      equipment: "KETTLEBELL",
    },
    {
      name: "KB Offset Drop Lunge",
      type: ExerciseType.WEIGHTED_REPS,
      equipment: "KETTLEBELL",
    },
    {
      name: "KB Offset Squat",
      type: ExerciseType.WEIGHTED_REPS,
      equipment: "KETTLEBELL",
    },
    {
      name: "Wrist Roller",
      type: ExerciseType.WEIGHTED_REPS,
      equipment: "PLATE",
    },
    {
      name: "Hammer Rotations",
      type: ExerciseType.WEIGHTED_REPS,
      equipment: "OTHER",
    },
    {
      name: "Weighted Hyperextension",
      type: ExerciseType.WEIGHTED_REPS,
      equipment: "PLATE",
    },
    {
      name: "Rest",
      type: ExerciseType.BODYWEIGHT,
      equipment: "NONE",
    },
  ] satisfies Prisma.ExerciseCreateInput[];

  const routines = [
    {
      name: "Warmup",
      type: RoutineType.WARMUP,
      sortOrder: "",
      exercises: {
        connect: [
          {
            name: "Jogging",
          },
          {
            name: "Pullups",
          },
          {
            name: "Easy Climbing",
          },
          {
            name: "Stretching",
          },
          {
            name: "Scapular Pullups",
          },
          {
            name: "Power Pullups",
          },
        ],
      },
    },
    {
      name: "Low Intensity Climbing",
      type: RoutineType.CLIMBING,
      sortOrder: "",
      exercises: {
        connect: [
          {
            name: "Weakness Practice",
          },
          {
            name: "2nd Tier Bouldering",
          },
        ],
      },
    },
    {
      name: "High Intensity Climbing",
      type: RoutineType.CLIMBING,
      sortOrder: "",
      exercises: {
        connect: [
          { name: "Rooting and Dead Stops" },
          { name: "3 Try Board Circuit" },
        ],
      },
    },
    {
      name: "Performance Climbing",
      type: RoutineType.CLIMBING,
      sortOrder: "",
      exercises: {
        connect: [{ name: "Limit Bouldering" }],
      },
    },
    {
      name: "Wrists/Core",
      type: RoutineType.STRENGTH,
      sortOrder: "",
      exercises: {
        connect: [
          { name: "Wrist Roller" },
          { name: "Hammer Rotations" },
          { name: "Weighted Hyperextension" },
        ],
      },
    },
    {
      name: "Rest Day",
      type: RoutineType.REST,
      sortOrder: "",
      exercises: {
        connect: [{ name: "Rest" }],
      },
    },
  ] satisfies Prisma.RoutineCreateInput[];

  const trainingDays = [
    {
      date: dayjs().startOf("w").unix(),
      routines: {
        connect: [
          {
            id: "cllr6p2by000270yph615mvun",
          },
          {
            id: "cllr6p2zz000770ypsrr79l6u",
          },
          {
            id: "cllr6p2zw000470ypmhhr0fb0",
          },
        ],
      },
      microcycle: {
        connect: {
          id: micro.id,
        },
      },
    },
    {
      date: dayjs().startOf("w").add(1, "d").unix(),
      routines: {
        connect: [
          {
            name: "Warmup",
          },
          {
            name: "High Intensity Climbing",
          },
          {
            name: "Wrists/Core",
          },
        ],
      },
      microcycle: {
        connect: {
          id: micro.id,
        },
      },
    },
    {
      date: dayjs().startOf("w").add(2, "d").unix(),
      routines: {
        connect: [
          {
            name: "Rest Day",
          },
        ],
      },
      microcycle: {
        connect: {
          id: micro.id,
        },
      },
    },
    {
      date: dayjs().startOf("w").add(3, "d").unix(),
      routines: {
        connect: [
          {
            name: "Warmup",
          },
          {
            name: "High Intensity Climbing",
          },
          {
            name: "Wrists/Core",
          },
        ],
      },
      microcycle: {
        connect: {
          id: micro.id,
        },
      },
    },
    {
      date: dayjs().startOf("w").add(4, "d").unix(),
      routines: {
        connect: [
          {
            name: "Rest Day",
          },
        ],
      },
      microcycle: {
        connect: {
          id: micro.id,
        },
      },
    },
    {
      date: dayjs().startOf("w").add(5, "d").unix(),
      routines: {
        connect: [
          {
            name: "Rest Day",
          },
        ],
      },
      microcycle: {
        connect: {
          id: micro.id,
        },
      },
    },
    {
      date: dayjs().startOf("w").add(6, "d").unix(),
      routines: {
        connect: [
          {
            name: "Performance Climbing",
          },
        ],
      },
      microcycle: {
        connect: {
          id: micro.id,
        },
      },
    },
  ] satisfies Prisma.TrainingDayCreateInput[];

  const createExercises = () => {
    exercises.forEach(async (e) => {
      await prisma.exercise.create({ data: e });
    });
  };

  const createRoutines = () => {
    routines.forEach(async (r) => {
      await prisma.routine.create({ data: r });
    });
  };

  const createDays = () => {
    trainingDays.forEach(async (t) => {
      await prisma.trainingDay.create({ data: t });
    });
  };

  // createExercises();
  // createRoutines();
  createDays();
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
