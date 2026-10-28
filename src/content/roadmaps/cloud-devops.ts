import { RES } from "./resources";
import type { ResourceDraft, RoadmapDraft } from "./types";

/**
 * Outline from issue #96; original lessons in content/cloud-devops.content.ts (issue #198).
 * Research and sources: src/content/research/cloud-devops.md.
 * Track specific links not in the shared pool; each checked to resolve (October 2026).
 */
const r = (label: string, url: string, kind: ResourceDraft["kind"] = "article"): ResourceDraft => ({ label, url, kind });

const ubuntuCli = r("Ubuntu: The Linux command line for beginners", "https://ubuntu.com/tutorials/command-line-for-beginners", "practice");
const carpentryShell = r("Software Carpentry: The Unix shell", "https://swcarpentry.github.io/shell-novice/", "practice");
const mdnDns = r("MDN glossary: DNS", "https://developer.mozilla.org/en-US/docs/Glossary/DNS");
const awsVpc = r("AWS docs: What is Amazon VPC", "https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html");
const az900Guide = r(
  "Microsoft Learn: Azure Fundamentals study guide",
  "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-900",
);
const azureCloudConcepts = r(
  "Microsoft Learn: Describe cloud concepts",
  "https://learn.microsoft.com/en-us/training/paths/microsoft-azure-fundamentals-describe-cloud-concepts/",
  "practice",
);
const azureTraining = r("Microsoft Learn: Azure training", "https://learn.microsoft.com/en-us/training/azure/", "practice");
const awsShared = r("AWS: Shared responsibility model", "https://aws.amazon.com/compliance/shared-responsibility-model/");
const awsSkillBuilder = r("AWS Skill Builder (free courses)", "https://skillbuilder.aws/", "practice");
const awsFree = r("AWS Free Tier", "https://aws.amazon.com/free/");
const awsIam = r("AWS docs: IAM security best practices", "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html");
const awsBudgets = r(
  "AWS docs: Managing costs with budgets",
  "https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html",
);
const azureBudgets = r(
  "Microsoft Learn: Create and manage Azure budgets",
  "https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-acm-create-budgets",
);
const ghActions = r("GitHub Docs: GitHub Actions", "https://docs.github.com/en/actions");
const ghActionsQuickstart = r("GitHub Actions quickstart", "https://docs.github.com/en/actions/get-started/quickstart", "practice");
const terraformTutorials = r("HashiCorp: Terraform tutorials", "https://developer.hashicorp.com/terraform/tutorials", "practice");
const k8sBasics = r("Kubernetes: Learn Kubernetes basics", "https://kubernetes.io/docs/tutorials/kubernetes-basics/", "practice");
const killercoda = r("Killercoda: free browser labs", "https://killercoda.com/", "practice");
const prometheus = r("Prometheus: Overview", "https://prometheus.io/docs/introduction/overview/");
const sreBook = r("Google: Site Reliability Engineering book (free)", "https://sre.google/sre-book/table-of-contents/");
const awsWellArchitected = r(
  "AWS Well Architected Framework",
  "https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html",
);
const awsCcp = r(
  "AWS Certified Cloud Practitioner (exam page)",
  "https://aws.amazon.com/certification/certified-cloud-practitioner/",
);

export const cloudDevops: RoadmapDraft = {
  slug: "cloud-devops-engineer",
  title: "Cloud and DevOps",
  description:
    "Run the servers, pipelines and cloud accounts that keep apps online for banks, fintechs and telcos. This is a next step after the backend or IT support track. Theory works on any device; the hands on labs need a computer or a free browser lab.",
  track: "cloud-devops",
  field_category: "infrastructure",
  level: "next-step",
  leads_to: ["cybersecurity"],
  locale: "en-GH",
  status: "draft",
  nodes: [
    {
      slug: "before-you-start",
      title: "Before you start",
      summary:
        "Cloud and DevOps work sits on top of other skills, so this section checks you are ready and shows what the jobs look like. Read it first even if you are keen to open a cloud account.",
      parent: null,
      optional: false,
      resources: [],
    },
    {
      slug: "what-you-need-first",
      title: "What you need first",
      summary:
        "You should already be comfortable with networks and operating systems from IT support, or with code, Git and APIs from backend development. You can read the theory on any device, but from the Linux section onwards you will need a laptop or desktop and a steady connection, or a free browser lab.",
      parent: "before-you-start",
      optional: false,
      resources: [RES.gitBook],
    },
    {
      slug: "cloud-devops-jobs",
      title: "Cloud and DevOps jobs in Ghana",
      summary:
        "Banks, fintechs, telcos and software firms in Accra hire cloud engineers and DevOps engineers, but most adverts ask for a year or more of experience. Junior routes include internships, national service placements, cloud support roles and free employer run cloud training cohorts.",
      parent: "before-you-start",
      optional: false,
      resources: [awsSkillBuilder],
    },
    {
      slug: "linux-and-networking",
      title: "Linux and networking for servers",
      summary:
        "Almost every cloud server runs Linux and talks over networks you have to configure yourself. This section turns basic computer skills into the server skills cloud adverts ask for.",
      parent: null,
      optional: false,
      resources: [],
    },
    {
      slug: "linux-command-line",
      title: "Working in the Linux terminal",
      summary:
        "Learn to move around the file system, manage files, users and permissions, install packages and read logs from the command line. Practise on a free cloud shell or a Linux machine until these commands feel normal.",
      parent: "linux-and-networking",
      optional: false,
      resources: [ubuntuCli, carpentryShell],
    },
    {
      slug: "scripting-and-automation",
      title: "Scripting and automation",
      summary:
        "Bash and Python scripts let you repeat a task on ten servers as easily as on one, and adverts ask for them often. Start by automating a small job you do by hand, such as backing up a folder or checking that a website responds.",
      parent: "linux-and-networking",
      optional: false,
      resources: [carpentryShell, RES.pythonTutorial],
    },
    {
      slug: "networking-for-cloud",
      title: "Networking for the cloud",
      summary:
        "Cloud networks use the same ideas as an office network: IP addresses, subnets, DNS, ports, firewalls and load balancers. Learn how a request travels from a phone in Tamale to a server in a cloud region and back.",
      parent: "linux-and-networking",
      optional: false,
      resources: [mdnDns, awsVpc, RES.mdnHttp],
    },
    {
      slug: "cloud-fundamentals",
      title: "Cloud fundamentals",
      summary:
        "Cloud providers rent out computers, storage and databases by the hour so teams do not have to buy their own. This section covers the ideas that apply across AWS, Azure and Google Cloud.",
      parent: null,
      optional: false,
      resources: [],
    },
    {
      slug: "cloud-concepts",
      title: "What the cloud really is",
      summary:
        "Understand infrastructure, platform and software as a service, regions and availability zones, and the shared responsibility model that splits security work between you and the provider. These ideas come up in every entry level cloud exam and interview.",
      parent: "cloud-fundamentals",
      optional: false,
      resources: [azureCloudConcepts, awsShared, az900Guide],
    },
    {
      slug: "core-cloud-services",
      title: "Compute, storage and databases",
      summary:
        "Learn the core building blocks: virtual machines, object storage, managed databases and serverless functions. Launch a small server, host a static file and connect a database so you see how the pieces fit.",
      parent: "cloud-fundamentals",
      optional: false,
      resources: [awsSkillBuilder, azureTraining],
    },
    {
      slug: "identity-and-access",
      title: "Identity, access and least privilege",
      summary:
        "Cloud accounts are controlled by users, roles and policies, and a careless permission can expose a whole company. Learn to turn on multifactor sign in, avoid using the main account day to day and give each person only the access they need.",
      parent: "cloud-fundamentals",
      optional: false,
      resources: [awsIam],
    },
    {
      slug: "cloud-costs",
      title: "Free tiers and keeping costs under control",
      summary:
        "On a paid cloud account a forgotten server keeps billing in foreign currency, which can cost far more than you expect in cedis. Practise without entering card details, set a budget alert on any real account and delete what you no longer need.",
      parent: "cloud-fundamentals",
      optional: false,
      resources: [awsFree, awsBudgets, azureBudgets],
    },
    {
      slug: "shipping-software",
      title: "Shipping software automatically",
      summary:
        "DevOps is about getting code from a developer's laptop to users quickly and safely. This section covers the version control, pipelines and containers that make that possible.",
      parent: null,
      optional: false,
      resources: [],
    },
    {
      slug: "git-for-teams",
      title: "Git for teams",
      summary:
        "Go beyond saving your own work to branches, pull requests, code review and tags that a whole team relies on. Pipelines start from Git events, so a clean history makes everything after it easier.",
      parent: "shipping-software",
      optional: false,
      resources: [RES.gitBook, RES.githubDocs],
    },
    {
      slug: "ci-cd-pipelines",
      title: "Continuous integration and delivery",
      summary:
        "A pipeline builds your code, runs the tests and deploys it every time someone pushes a change. Build one for a small project with a free tool such as GitHub Actions and watch it catch a broken change before users do.",
      parent: "shipping-software",
      optional: false,
      resources: [ghActions, ghActionsQuickstart],
    },
    {
      slug: "containers",
      title: "Containers with Docker",
      summary:
        "A container packages an app with everything it needs so it runs the same on your laptop and on a server. Learn to write a Dockerfile, build an image and run it, on a computer with enough memory or in a free browser lab.",
      parent: "shipping-software",
      optional: false,
      resources: [RES.docker, RES.twelveFactor],
    },
    {
      slug: "running-at-scale",
      title: "Running infrastructure at scale",
      summary:
        "Once an app has real users you need repeatable setups, visibility and a plan for when things break. This section covers the tools that DevOps adverts in Ghana name most after cloud and containers.",
      parent: null,
      optional: false,
      resources: [],
    },
    {
      slug: "infrastructure-as-code",
      title: "Infrastructure as code",
      summary:
        "Instead of clicking through a cloud console, you describe servers and networks in files that can be reviewed, versioned and rebuilt. Terraform is a common example, and it lets you tear a practice setup down so it stops costing money.",
      parent: "running-at-scale",
      optional: false,
      resources: [terraformTutorials],
    },
    {
      slug: "kubernetes-basics",
      title: "Kubernetes basics",
      summary:
        "Kubernetes runs many containers across many machines and restarts them when they fail. It appears in many mid level adverts, so learn the main ideas in a free browser lab without paying for a cluster.",
      parent: "running-at-scale",
      optional: true,
      resources: [k8sBasics, killercoda],
    },
    {
      slug: "monitoring-and-logging",
      title: "Monitoring, logs and alerts",
      summary:
        "Good teams know a service is down before customers start calling. Learn to collect metrics and logs, build a simple dashboard and set alerts that wake the right person for the right reason.",
      parent: "running-at-scale",
      optional: false,
      resources: [prometheus, sreBook],
    },
    {
      slug: "reliability-and-security",
      title: "Backups, security and incidents",
      summary:
        "Plan for failure with backups you have actually tested, patched systems and secrets kept out of code. When something does break, follow a calm incident process and write up what happened so it does not happen again.",
      parent: "running-at-scale",
      optional: false,
      resources: [awsWellArchitected, RES.owasp, sreBook],
    },
    {
      slug: "getting-hired",
      title: "Getting hired",
      summary:
        "Cloud employers want proof you can build and run something, not only a list of courses. This section turns your practice into evidence and points you to realistic first roles.",
      parent: null,
      optional: false,
      resources: [],
    },
    {
      slug: "cloud-certifications",
      title: "Cloud certifications",
      summary:
        "Some Ghana cloud adverts ask for an AWS or Azure certification, and the fundamentals exams are a common first one. Use the free official study guides and practice questions, and treat the exam as a milestone rather than a substitute for hands on work.",
      parent: "getting-hired",
      optional: false,
      resources: [awsCcp, az900Guide],
    },
    {
      slug: "cloud-portfolio",
      title: "A cloud portfolio project",
      summary:
        "Build one small app end to end: code in Git, a pipeline that tests and deploys it, a container, infrastructure written as code, monitoring and a budget alert. Write a short readme with a diagram and what you would improve, then tear it down so it costs nothing.",
      parent: "getting-hired",
      optional: false,
      resources: [RES.githubDocs, RES.render],
    },
    {
      slug: "first-cloud-role",
      title: "Finding your first cloud role",
      summary:
        "Look for cloud support, junior DevOps, IT infrastructure and internship roles, and for free cloud training cohorts that include placement support. Many people move into DevOps from an IT support or developer job, so the role you have now can be your route in.",
      parent: "getting-hired",
      optional: false,
      resources: [awsSkillBuilder, azureTraining],
    },
  ],
};
