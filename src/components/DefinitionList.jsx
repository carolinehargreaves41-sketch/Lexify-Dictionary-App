import PropTypes from "prop-types";
import DefinitionCard from "./DefinitionCard";

function DefinitionList({ meanings }) {
  if (!meanings || meanings.length === 0) return null;

  return (
    <section className="content-container" aria-label="Word definitions">
      {meanings.map((meaning, index) => (
        <DefinitionCard
          key={index}
          partOfSpeech={meaning.partOfSpeech}
          definition={meaning.definition}
          example={meaning.example}
          synonyms={meaning.synonyms}
        />
      ))}
    </section>
  );
}

DefinitionList.propTypes = {
  meanings: PropTypes.arrayOf(
    PropTypes.shape({
      partOfSpeech: PropTypes.string,
      definition: PropTypes.string.isRequired,
      example: PropTypes.string,
      synonyms: PropTypes.arrayOf(PropTypes.string),
    }),
  ).isRequired,
};

export default DefinitionList;
