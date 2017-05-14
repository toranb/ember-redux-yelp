import fetch from 'fetch';

export function rate(id, rating) {
  return (dispatch) => {
    let body = {
      method: 'POST',
      body: JSON.stringify({rating: rating})
    };
    fetch(`/api/results/${id}`, body)
      .then(fetched => fetched.json())
      .then((response) => dispatch({type: 'RATE_ITEM', response: response.result}))
  };
}

export function comment(id, comment) {
  return (dispatch) => {
    let body = {
      method: 'PUT',
      body: JSON.stringify({comment: comment})
    };
    fetch(`/api/results/${id}`, body)
      .then(fetched => fetched.json())
      .then((response) => dispatch({type: 'COMMENT_ITEM', response: response.result}))
  };
}
