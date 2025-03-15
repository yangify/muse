import pytest
from app import app


@pytest.fixture
def client():
    with app.test_client() as client:
        yield client


def test_health_endpoint(client):
    # When
    response = client.get('/health')

    # Then
    assert response.status_code == 200
    assert response.json == {'status': 'healthy'}


def test_transcriptions_empty(client, mocker):
    # Given
    mocker.patch('repository.ts_repo.get_all', return_value=[])

    # When
    response = client.get('/transcriptions')

    # Then
    assert response.status_code == 200
    assert response.json == []


def test_search_no_query(client):
    # When
    response = client.get('/search')

    # Then
    assert response.status_code == 400
    assert response.json == {'error': 'Filename query parameter is missing'}
