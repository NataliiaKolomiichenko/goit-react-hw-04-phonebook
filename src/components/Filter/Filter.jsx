import PropTypes from 'prop-types'
import css from './Filter.module.css'

const Filter = ({ filter, onChange }) => {
  
  return <label className={css.inputLabel}> Find contacts by name
        <input 
            className={css.input}
            type="text"
            name="filter"
            value={filter}
            onChange={onChange}
        />
    </label>
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Filter