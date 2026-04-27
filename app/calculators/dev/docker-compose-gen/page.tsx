import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'Docker Compose Generator — docker-compose.yml Builder Free',
  description: 'Generate docker-compose.yml files visually. Configure services, volumes, networks, environment variables, and port mappings. Runs in your browser.',
  slug: 'docker-compose-gen',
  keywords: ['docker compose generator online free','docker-compose.yml builder browser','docker compose file creator','generate docker compose free','docker services generator online'],
})

const faqs = [
  { question: 'What is the difference between Docker and Docker Compose?', answer: "Docker runs individual containers. Docker Compose orchestrates multiple containers as a single application. A typical web app needs at minimum three containers: the application (Node.js/Python/Go), a database (PostgreSQL/MySQL), and a cache (Redis). Docker Compose defines all three in one docker-compose.yml file and starts them with a single command (docker compose up). It handles networking between containers, volume mounts for data persistence, environment variable configuration, startup order with depends_on, and shared configuration." },
  { question: 'What is the difference between volumes and bind mounts in Compose?', answer: "Named volumes (volumes: db_data:) are managed by Docker — Docker creates and manages the storage location. They persist across container recreations and are ideal for database data. docker compose down does not delete named volumes; docker compose down -v does. Bind mounts (./src:/app/src) map a host directory directly to a container path. They are used for development hot-reload: code changes on the host are immediately reflected in the container. In production, avoid bind mounts — use named volumes for persistence and build code into the image." },
  { question: 'How do I set environment variables securely in Docker Compose?', answer: "Three approaches in order of security: (1) env_file: - .env — reads from a .env file that stays out of version control. (2) environment: - KEY=value — inline in docker-compose.yml, which may be committed to git. Never put secrets here. (3) Docker Secrets (for Docker Swarm) — proper secret management stored outside the filesystem. For local development, the .env file approach is standard. For production Kubernetes, use Kubernetes Secrets or a secrets manager (Vault, AWS Secrets Manager) injected as environment variables by the orchestrator, not via docker-compose.yml." },
  { question: 'What does depends_on actually guarantee about startup order?', answer: "depends_on ensures containers start in order — it does NOT wait until the dependency is healthy and accepting connections. If your app container starts before PostgreSQL has finished initializing and accepting connections, the app will fail. The correct solution: add healthcheck to the database service and use depends_on with condition: service_healthy. The PostgreSQL healthcheck: test: ['CMD-SHELL', 'pg_isready -U postgres']. Then app depends_on: db: condition: service_healthy. Without healthcheck, app code must implement retry logic for database connection failures." },
  { question: 'How do I expose ports and what is the difference between ports and expose?', answer: "ports maps host:container — ports: - '3000:3000' makes the container port 3000 accessible at localhost:3000 on the host machine. expose lists ports that are accessible to other services within the Docker network but NOT to the host. expose: - '5432' means other containers can connect to the database on port 5432, but the host cannot (no localhost:5432). Use ports for services you need to access from your browser or host tools. Use expose for internal service-to-service communication where you do not want external access." },
  { question: 'What is the difference between docker compose up and docker compose run?', answer: "docker compose up starts all services defined in the file and keeps them running. docker compose up -d runs them in detached mode (background). docker compose run SERVICE COMMAND starts a single service and runs a one-off command in it — useful for database migrations (docker compose run app python manage.py migrate), running tests, or interactive debugging (docker compose run app bash). docker compose exec runs a command in an already-running container. Use up for normal development, run for one-off tasks, exec for debugging a running container." },
  { question: 'What other infrastructure tools are on this site?', answer: "The YAML Formatter validates and formats docker-compose.yml files — Docker Compose is strict about YAML indentation. The .gitignore Generator includes Docker-specific patterns (.env files, local overrides). The chmod Calculator handles file permission issues common in Docker volume mounts. The CIDR Calculator helps with Docker network subnet planning. The Environment File Parser reads and validates .env files used with Docker Compose. All are in the Dev Tools section." },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'Docker Compose Generator — docker-compose.yml Builder Free',
    description: 'Generate docker-compose.yml files visually. Configure services, volumes, networks, environment variables, and port mappings. Runs in your browser.',
    slug: 'docker-compose-gen',
    faqs,
  })
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.webApp) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.breadcrumb) }} />
      {jsonLd.faqPage && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.faqPage) }} />
      )}
      <CalculatorClient faqs={faqs} />
    </>
  )
}
