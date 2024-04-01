import { PrismaClient } from "@prisma/client";
import { SessionManager } from "./sessions";
import express from "express";
import bcrypt from "bcrypt";

export function createServer(sessions: SessionManager, verifyAuth: any) {
  const SALT_ROUNDS = 10;

  const prisma = new PrismaClient();
  const app = express();
  app.use(express.json());

  app.post("/api/animal/recommendation", async (req, res) => {
    const {
      name,
      email,
      crop_id,
      min_temp,
      max_temp,
      average_annual_cold_hours,
      most_important_product_id,
      min_soil_pH,
      max_soil_pH,
      soil_type_id,
    } = req.body;

    const cultivars = await prisma.cultivar.findMany({
      where: {
        crop_id: {
          equals: crop_id,
        },
        min_temp_requirement: {
          lte: max_temp,
        },
        max_temp_requirement: {
          gte: min_temp,
        },
        min_annual_cold_hours: {
          lte: average_annual_cold_hours,
        },
        max_annual_cold_hours: {
          gte: average_annual_cold_hours,
        },
        min_soil_pH: {
          lte: max_soil_pH,
        },
        max_soil_pH: {
          gte: min_soil_pH,
        },
        soil_type_id: {
          equals: soil_type_id,
        },
        expected_product_yields: {
          some: {
            product_id: {
              equals: most_important_product_id,
            },
          },
        },
      },
      include: {
        crop: true,
        diseases: true,
        pests: true,
        fertiliser_applications: true,
        expected_product_yields: true,
      },
    });

    res.json(cultivars);
  });

  app.post("/api/animal/recommendation", async (req, res) => {
    const {
      name,
      email,
      animal_id,
      min_temp,
      max_temp,
      daily_feed_requirement,
      daily_water_requirement,
      annual_fertility_rate,
      most_important_product_id,
    } = req.body;

    const breeds = await prisma.breed.findMany({
      where: {
        animal_id: {
          equals: animal_id,
        },
        min_temp_requirement: {
          lte: max_temp,
        },
        max_temp_requirement: {
          gte: min_temp,
        },
        daily_feed_requirement: {
          lte: daily_feed_requirement,
        },
        daily_water_requirement: {
          lte: daily_water_requirement,
        },
        annual_fertility_rate: {
          gte: annual_fertility_rate,
        },
        expected_product_yields: {
          some: {
            product_id: {
              equals: most_important_product_id,
            },
          },
        },
      },
      include: {
        animal: true,
        diseases: true,
        pests: true,
        expected_product_yields: true,
      },
    });

    res.json(breeds);
  });

  app.post("/api/create-supplier", async (req, res) => {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const supplier = await prisma.supplier.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return res.json(supplier);
  });

  app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    // Get supplier from database
    const supplier = await prisma.supplier.findFirst({
      where: {
        email: {
          equals: email,
        },
      },
    });

    // Check if supplier exists from database
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    // Supplier exists in the database, so we check the password
    bcrypt.compare(password, supplier.password, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }

      if (!result) {
        return res.status(401).json({ message: "Invalid password" });
      }

      // Password is correct, so we create a session
      const token = Math.random().toString(36).substring(2);
      sessions.set(token, supplier.id);
      res.json({ token });
    });
  });

  app.get("/api/form-options", async (req, res) => {
    // List of tables that provide form options
    const tables = [
      "disease",
      "product",
      "pest",
      "likelihood",
      "animal",
      "crop",
      "soilType",
      "fertiliser",
      "sIUnit",
      "conventionalUnit",
    ];

    // Getting the data for all tables
    const data = await Promise.all(
      //@ts-ignore
      tables.map((table) => prisma[table].findMany())
    );

    // Creating a form options object
    const formOptions = new Object();

    // Assigning the data to the form options object
    for (let i = 0; i < tables.length; i++) {
      const key = tables[i];
      const value = data[i];

      // @ts-ignore
      formOptions[key] = value;
    }

    res.status(200).json(formOptions);
  });

  app.get("/api/supplier", verifyAuth, async (req, res) => {
    const supplierId = res.locals.supplierId;

    // Get the supplier from the database
    const supplier = await prisma.supplier.findUnique({
      where: {
        id: supplierId,
      },
      include: {
        cultivars: true,
        breeds: true,
      },
    });

    // Check if the supplier exists in the database
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    // Return the supplier
    res.json(supplier);
  });

  app.get("/api/breeds", verifyAuth, async (req, res) => {
    const supplierId = res.locals.supplierId;

    // Get the supplier from the database
    const breeds = await prisma.breed.findMany({
      where: {
        supplier_id: {
          equals: supplierId,
        },
      },
      include: {
        animal: true,
        diseases: true,
        pests: true,
        expected_product_yields: true,
      },
    });

    // Return the breeds
    res.json(breeds);
  });

  app.get("/api/cultivars", verifyAuth, async (req, res) => {
    const supplierId = res.locals.supplierId;

    // Get the supplier from the database
    const cultivars = await prisma.cultivar.findMany({
      where: {
        supplier_id: {
          equals: supplierId,
        },
      },

      include: {
        crop: true,
        diseases: true,
        pests: true,
        fertiliser_applications: true,
      },
    });

    // Return the cultivars
    res.json(cultivars);
  });

  app.post("/api/breeds", verifyAuth, async (req, res) => {
    const supplierId = res.locals.supplierId;

    const {
      breed_name,
      animal_id,
      daily_feed_requirement,
      daily_water_requirement,
      min_temp_requirement,
      max_temp_requirement,
      annual_fertility_rate,
      expected_product_yields,
      diseases,
      pests,
    } = req.body;

    const breed = await prisma.breed.create({
      data: {
        breed_name,
        daily_feed_requirement,
        daily_water_requirement,
        min_temp_requirement,
        max_temp_requirement,
        annual_fertility_rate,
        supplier_id: supplierId,
        animal_id,
        diseases: {
          create: diseases.map((disease: any) => {
            return {
              treatment: disease.treatment,
              precaution: disease.precaution,
              disease_incidence_likelihood: {
                connect: {
                  id: disease.disease_incidence_likelihood_id,
                },
              },
              disease: {
                connect: {
                  id: disease.disease_id,
                },
              },
            };
          }),
        },
        pests: {
          create: pests.map((pest: any) => ({
            treatment: pest.treatment,
            precaution: pest.precaution,
            pest_incidence_likelihood: {
              connect: {
                id: pest.pest_incidence_likelihood_id,
              },
            },
            pest: {
              connect: {
                id: pest.pest_id,
              },
            },
          })),
        },
        expected_product_yields: {
          create: expected_product_yields.map((expectedProductYield: any) => {
            return {
              average_quantity_produced:
                expectedProductYield.average_quantity_produced,
              product: {
                connect: {
                  id: expectedProductYield.product_id,
                },
              },
              product_unit: {
                connect: {
                  id: expectedProductYield.product_unit_id,
                },
              },
            };
          }),
        },
      },
    });

    res.json(breed);
  });

  app.post("/api/cultivars", verifyAuth, async (req, res) => {
    const supplierId = res.locals.supplierId;

    const {
      name,
      crop_id,
      min_temp_requirement,
      max_temp_requirement,
      min_daily_irrigation,
      max_daily_irrigation,
      min_annual_cold_hours,
      max_annual_cold_hours,
      min_soil_pH,
      max_soil_pH,
      soil_type_id,
      diseases,
      pests,
      expected_product_yields,
      fertiliser_applications,
    } = req.body;

    const cultivar = await prisma.cultivar.create({
      data: {
        name,
        crop_id,
        min_temp_requirement,
        max_temp_requirement,
        min_daily_irrigation,
        max_daily_irrigation,
        min_annual_cold_hours,
        max_annual_cold_hours,
        min_soil_pH,
        max_soil_pH,
        soil_type_id,
        supplier_id: supplierId,

        diseases: {
          create: diseases.map((disease: any) => {
            return {
              treatment: disease.treatment,
              precaution: disease.precaution,
              disease_incidence_likelihood: {
                connect: {
                  id: disease.disease_incidence_likelihood_id,
                },
              },
              disease: {
                connect: {
                  id: disease.disease_id,
                },
              },
            };
          }),
        },

        pests: {
          create: pests.map((pest: any) => {
            return {
              treatment: pest.treatment,
              precaution: pest.precaution,
              pest_incidence_likelihood: {
                connect: {
                  id: pest.pest_incidence_likelihood_id,
                },
              },
              pest: {
                connect: {
                  id: pest.pest_id,
                },
              },
            };
          }),
        },

        expected_product_yields: {
          create: expected_product_yields.map((expectedProductYield: any) => {
            return {
              average_quantity_produced:
                expectedProductYield.average_quantity_produced,
              product: {
                connect: {
                  id: expectedProductYield.product_id,
                },
              },
              product_unit: {
                connect: {
                  id: expectedProductYield.product_unit_id,
                },
              },
            };
          }),
        },

        fertiliser_applications: {
          create: fertiliser_applications.map((fertiliserApplication: any) => {
            return {
              quantity_per_plant: fertiliserApplication.quantity_per_plant,
              milestone_for_application:
                fertiliserApplication.milestone_for_application,
              fertiliser: {
                connect: {
                  id: fertiliserApplication.fertiliser_id,
                },
              },
            };
          }),
        },
      },
    });

    res.json(cultivar);
  });

  return app;
}
