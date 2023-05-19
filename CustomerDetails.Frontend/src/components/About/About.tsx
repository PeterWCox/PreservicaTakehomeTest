import { Persona, PersonaSize } from "@fluentui/react";
import "./About.css";
import { Text } from "@fluentui/react/lib/Text";

export const About = () => {
  return (
    <div className="aboutContainer">
      <div className="lhs">
        <Persona
          imageUrl={
            "https://media.licdn.com/dms/image/D4E03AQHIfVfts9iBZQ/profile-displayphoto-shrink_800_800/0/1682434811899?e=1689811200&v=beta&t=dp9lBsYixderNiS-dx0kviX3SY8zsS_0K0e__nXSjcw"
          }
          text={"Developed by Peter Cox"}
          secondaryText={"Full Stack C# + React Developer"}
          size={PersonaSize.size120}
        />
      </div>

      <div className="rhs">
        <p>
          A rather thrown together full-stack application that provides CRUD
          functionality for storing customers. The whole thing could do with a
          lot of testing as I'm sure there's a few bugs, but hopefully
          demonstrates I can throw together a Full-stack app in a short period
          of time
        </p>

        <Text variant="xLarge">Tech Used:</Text>
        <ul>
          <li>Backend - ASP.NET Core Web API with Entity Framework Core</li>
          <li>
            Frontend - ReactJS with Fluent UI, and especially Tanstack Query
          </li>
        </ul>

        <Text variant="xLarge">Frontend Todos:</Text>
        <ul>
          <li>Add storybook for the various components</li>
          <li>Add unit tests for the 'Util' helper classes</li>
          <li>Demonstrate React routing knowledge, rather than using Modals</li>
          <li>Make it responsive</li>
        </ul>

        <Text variant="xLarge">Backend Todos:</Text>
        <ul>
          <li>
            Decoupled validation from the controllers (and moved to service)
          </li>
          <li>Add unit tests for services</li>
          <li>Move repositories and servces into seperate projects</li>
          <li>Use a real SQL DB rather than an in-memory EF core DB</li>
        </ul>
      </div>
    </div>
  );
};
