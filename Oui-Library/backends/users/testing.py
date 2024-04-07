from django.core.management.utils import get_random_secret_key

# Generate the secret key
secret_key = get_random_secret_key()

# Print or use the secret key
print(secret_key)
