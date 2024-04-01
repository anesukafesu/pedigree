import { createTransport, Transporter } from "nodemailer";

export class Mailer {
  private transporter: Transporter;

  constructor(user: string, pass: string) {
    this.transporter = createTransport({
      host: "smtppro.zoho.com",
      port: 465,
      secure: true,
      auth: {
        user,
        pass,
      },
    });
  }

  async sendRecommendation(
    type: "crop" | "animal",
    recipientEmailAddress: string,
    recipientName: string,
    recommendations: any[]
  ) {
    const info = await this.transporter.sendMail({
      from: '"Pedigree" <pedigree@halogenapps.com>', // sender address
      to: recipientEmailAddress, // list of receivers
      subject: `Recommendation for best ${recommendations[0][
        type
      ].name.toLowerCase()} ${type === "crop" ? "cultivars" : "breeds"}`,
      html:
        type === "crop"
          ? this.composeBodyForCultivarRecommendation(
              recipientName,
              recommendations
            )
          : this.composeBodyForBreedRecommendation(
              recipientName,
              recommendations
            ),
    });

    return info;
  }

  private composeBodyForBreedRecommendation(
    recipientName: string,
    recommendations: any[]
  ) {
    return `
      <p>Good day ${recipientName}</p>
      <p>
        Based on the parameters you provided on our website. Here's our list of the best ${recommendations[0].animal.name.toLowerCase()} breeds to invest in.
      </p>

      ${recommendations.map((recommendation: any) => {
        return `
          <h2>${recommendation.breed_name}</h2>
          <p><strong>Breed Name:</strong> ${recommendation.breed_name}</p>
          <p><strong>Animal:</strong> ${recommendation.animal.name}</p>
          <p><strong>Supplier:</strong> ${recommendation.supplier.name} (${
          recommendation.supplier.email
        })</p>
          <p><strong>Temperature:</strong> ${
            recommendation.min_temp_requirement
          } °C - ${recommendation.max_temp_requirement}°C</p>
          <p><strong>Water Consumption:</strong> ${
            recommendation.daily_water_requirement
          } l</p>
          <p><strong>Food Consumption:</strong> ${
            recommendation.daily_feed_requirement
          } kg</p>
          <p><strong>Annual Fertility Rate Per Female:</strong> ${
            recommendation.annual_fertility_rate
          } offspring</p>
          <h3>Diseases</h3>
          ${recommendation.diseases.map(
            ({
              disease,
              disease_incidence_likelihood,
              precaution,
              treatment,
            }: any) => {
              return `
                <p><strong>Disease Name:</strong> ${disease.name}</p>
                <p><strong>Disease Incidence Likelihood:</strong> ${
                  disease_incidence_likelihood.name
                }</p>
                <h4>Precautions:</h4>
                <p>${precaution || "n/a"}</p>
                <h4>Treatment:</h4>
                <p>${treatment || "n/a"}</p>`;
            }
          )}
          <h3>Pests</h3>
          ${recommendation.pests.map(
            ({
              pest,
              pest_incidence_likelihood,
              precaution,
              treatment,
            }: any) => {
              return `
                <p><strong>Pest Name:</strong> ${pest.name}</p>
                <p><strong>Pest Incidence Likelihood:</strong> ${
                  pest_incidence_likelihood.name
                }</p>
                <h4>Precautions:</h4>
                <p>${precaution || "n/a"}</p>
                <h4>Treatment:</h4>
                <p>${treatment || "n/a"}</p>
             `;
            }
          )}
          <h3>Expected Production</h3>
          ${recommendation.expected_product_yields.map(
            ({ product, average_quantity_produced, product_unit }: any) => {
              return `
                <p><strong>${
                  product.name
                }:</strong> ${average_quantity_produced} ${
                average_quantity_produced === 1
                  ? product_unit.name
                  : product_unit.plural_name
              }</p>`;
            }
          )}
        `;
      })}
    </ol>
    <br/>
    <p>We wish all the best</p>
    <br/>
    <p>The Pedigree Team</p>
    `;
  }

  // Write a function to create an HTML body
  private composeBodyForCultivarRecommendation(
    recipientName: string,
    recommendations: any[]
  ) {
    return `
    <p>Good day ${recipientName}</p>

    <p>
    Based on the parameters you provided on our website. Here's our list of the best ${recommendations[0].crop.name.toLowerCase()} cultivars to invest in.
    </p>

      ${recommendations.map((recommendation: any) => {
        return `
          <h2>${recommendation.name}</h2>
          <p><strong>Variety Name:</strong> ${recommendation.name}</p>
          <p><strong>Crop Name:</strong> ${recommendation.crop.name}</p>
          <p><strong>Supplier:</strong> ${recommendation.supplier.name} (${
          recommendation.supplier.email
        })</p>
          <p><strong>Temperature:</strong> ${
            recommendation.min_temp_requirement
          } °C - ${recommendation.max_temp_requirement}°C</p>
          <p><strong>Daily Water Intake:</strong> ${
            recommendation.min_daily_irrigation
          } mm - ${recommendation.max_daily_irrigation} mm</p>
          <p><strong>Annual Cold Hours:</strong> ${
            recommendation.min_annual_cold_hours
          } hrs - ${recommendation.max_annual_cold_hours} hrs</p>
          <p><strong>Soil pH:</strong> ${recommendation.min_soil_pH} - ${
          recommendation.max_soil_pH
        }</p>
          <p><strong>Ideal Soil Type:</strong> ${
            recommendation.soil_type.name
          }</p>
          <h3>Diseases</h3>
          ${recommendation.diseases.map(
            ({
              disease,
              disease_incidence_likelihood,
              precaution,
              treatment,
            }: any) => {
              return `
                <p><strong>Disease Name:</strong> ${disease.name}</p>
                <p><strong>Disease Incidence Likelihood:</strong> ${
                  disease_incidence_likelihood.name
                }</p>
                <h4>Precautions:</h4>
                <p>${precaution || "n/a"}</p>
                <h4>Treatment:</h4>
                <p>${treatment || "n/a"}</p>`;
            }
          )}
          <h3>Pests</h3>
          ${recommendation.pests.map(
            ({
              pest,
              pest_incidence_likelihood,
              precaution,
              treatment,
            }: any) => {
              return `
                <p><strong>Pest Name:</strong> ${pest.name}</p>
                <p><strong>Pest Incidence Likelihood:</strong> ${
                  pest_incidence_likelihood.name
                }</p>
                <h4>Precautions:</h4>
                <p>${precaution || "n/a"}</p>
                <h4>Treatment:</h4>
                <p>${treatment || "n/a"}</p>
             `;
            }
          )}
          <h3>Fertiliser Applications</h3>
          ${recommendation.fertiliser_applications.map(
            ({
              fertiliser,
              milestone_for_application,
              quantity_per_plant,
            }: any) => {
              return `
                <p><strong>Fertiliser Name:</strong> ${fertiliser.name}</p>
                <p><strong>Milestone for Application:</strong> ${milestone_for_application}</p>
                <p><strong>Quantity per Plant:</strong> ${quantity_per_plant} g</p>
              `;
            }
          )}
          <h3>Expected Yields</h3>
          ${recommendation.expected_product_yields.map(
            ({ product, average_quantity_produced, product_unit }: any) => {
              return `
                <p><strong>${
                  product.name
                }:</strong> ${average_quantity_produced} ${
                average_quantity_produced === 1
                  ? product_unit.name
                  : product_unit.plural_name
              }</p>`;
            }
          )}
        `;
      })}
    </ol>
    <br/>
    <p>We wish all the best</p>
    <br/>
    <p>The Pedigree Team</p>
    `;
  }
}
