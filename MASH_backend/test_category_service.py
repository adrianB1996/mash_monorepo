"""
Unit tests for the category_service module in the MASH backend.

This test suite covers:

- remove_json_comments: Ensures that comments (//) are properly removed from JSON strings before parsing.
- generate_categories (mocked):
    - Successful category generation: Verifies that the function returns a CategoryResponse with the correct structure when the LLM returns valid data.
    - Empty LLM response: Ensures that a RuntimeError is raised if the LLM returns an empty response.
    - Invalid JSON from LLM: Ensures that a RuntimeError is raised if the LLM returns invalid JSON.

Mocks are used for the requests.post call to avoid making real HTTP requests to the LLM during testing.
"""

import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import pytest
from unittest.mock import patch, MagicMock
from services.category_service import generate_categories, remove_json_comments
from models.category_models import CategoryRequest, CategoryResponse

def test_remove_json_comments():
    json_with_comments = '{"key": "value"} // this is a comment\n{"foo": "bar"}'
    cleaned = remove_json_comments(json_with_comments)
    assert '//' not in cleaned
    assert '"key": "value"' in cleaned


@patch('services.category_service.requests.post')
def test_generate_categories_success(mock_post):
    mock_response = MagicMock()
    mock_response.json.return_value = {
        "response": '[{"title": "Test Category", "options": [{"title": "A", "state": "waiting"}, {"title": "B", "state": "waiting"}]}]'
    }
    mock_response.raise_for_status = lambda: None
    mock_post.return_value = mock_response

    req = CategoryRequest(theme="Test", num_categories=1, num_options=2)
    result = generate_categories(req)
    assert isinstance(result, CategoryResponse)
    assert result.theme == "Test"
    assert len(result.categories) == 1
    assert len(result.categories[0].options) == 2


@patch('services.category_service.requests.post')
def test_generate_categories_empty_response(mock_post):
    mock_response = MagicMock()
    mock_response.json.return_value = {"response": ''}
    mock_response.raise_for_status = lambda: None
    mock_post.return_value = mock_response
    req = CategoryRequest(theme="Test", num_categories=1, num_options=2)
    with pytest.raises(RuntimeError):
        generate_categories(req)


@patch('services.category_service.requests.post')
def test_generate_categories_invalid_json(mock_post):
    mock_response = MagicMock()
    mock_response.json.return_value = {"response": 'not a json'}
    mock_response.raise_for_status = lambda: None
    mock_post.return_value = mock_response
    req = CategoryRequest(theme="Test", num_categories=1, num_options=2)
    with pytest.raises(RuntimeError):
        generate_categories(req)
