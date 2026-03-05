import PropTypes from "prop-types";
import { capitalise, formatSynonyms } from "../utils/textHelpers";
import "./Definition.css";


function DefinitionCard({ partOfSpeech, definition, example, synonyms }) {
  const formattedSynonyms = formatSynonyms(synonyms, 5);

  return (
    <article className="definition-card">
      {partOfSpeech && (
        <p className="definition-card__pos">{capitalise(partOfSpeech)}</p>
      )}

      <p className="definition-card__definition">{capitalise(definition)}</p>

      {example && (
        <blockquote className="definition-card__example">
          <q>{capitalise(example)}</q>
        </blockquote>
      )}

      {formattedSynonyms && (
        <p className="definition-card__synonyms">
          <span>Synonyms: </span>
          {formattedSynonyms}
        </p>
      )}
    </article>
  );
}

DefinitionCard.propTypes = {
  partOfSpeech: PropTypes.string.isRequired,
  definition: PropTypes.string.isRequired,
  example: PropTypes.string,
  synonyms: PropTypes.arrayOf(PropTypes.string),
};

DefinitionCard.defaultProps = {
  example: "",
  synonyms: [],
};

export default DefinitionCard;
