import * as React from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Box,
    Container,
    Button,
    Stack,
    Grid,
    Card,
    CardContent,
    CardActions,
    Chip,
    Drawer,
    List,
    ListItemButton,
    ListItemText,
    Divider,
    Avatar,
    Paper,
    TextField,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material";
import { ThemeProvider, createTheme, alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import CloudDoneIcon from "@mui/icons-material/CloudDone";
import SecurityIcon from "@mui/icons-material/Security";
import SpeedIcon from "@mui/icons-material/Speed";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import DataObjectIcon from "@mui/icons-material/DataObject";
import HubIcon from "@mui/icons-material/Hub";
import InsightsIcon from "@mui/icons-material/Insights";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import PublicIcon from "@mui/icons-material/Public";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: { main: "#2563eb" },
        secondary: { main: "#7c3aed" },
        background: { default: "#f7f8fb", paper: "#ffffff" },
    },
    shape: { borderRadius: 16 },
    typography: {
        fontFamily:
            'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
        h2: { fontWeight: 800, letterSpacing: -0.8 },
        h4: { fontWeight: 800, letterSpacing: -0.5 },
        h6: { fontWeight: 800 },
        button: { textTransform: "none", fontWeight: 700 },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: { borderRadius: 999 },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: { borderRadius: 20 },
            },
        },
    },
});

function SectionHeader({ kicker, title, desc }) {
    return (
        <Stack spacing={1} sx={{ mb: { xs: 3, md: 4 } }}>
            {kicker ? (
                <Chip
                    label={kicker}
                    color="primary"
                    variant="outlined"
                    sx={{ width: "fit-content" }}
                />
            ) : null}
            <Typography variant="h4">{title}</Typography>
            {desc ? (
                <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 760 }}>
                    {desc}
                </Typography>
            ) : null}
        </Stack>
    );
}

function FeatureCard({ icon, title, desc, chips }) {
    return (
        <Card
            variant="outlined"
            sx={{
                height: "100%",
                borderColor: "divider",
                background:
                    "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.6))",
                backdropFilter: "blur(8px)",
            }}
        >
            <CardContent>
                <Stack spacing={1.5}>
                    <Box
                        sx={{
                            width: 44,
                            height: 44,
                            borderRadius: 3,
                            display: "grid",
                            placeItems: "center",
                            bgcolor: (t) => alpha(t.palette.primary.main, 0.10),
                            color: "primary.main",
                        }}
                    >
                        {icon}
                    </Box>
                    <Typography variant="h6">{title}</Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {desc}
                    </Typography>
                    {chips?.length ? (
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                            {chips.map((c) => (
                                <Chip key={c} label={c} size="small" variant="outlined" />
                            ))}
                        </Stack>
                    ) : null}
                </Stack>
            </CardContent>
        </Card>
    );
}

function Testimonial({ name, role, quote }) {
    return (
        <Card variant="outlined" sx={{ height: "100%", borderColor: "divider" }}>
            <CardContent>
                <Stack spacing={2}>
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>
                        “{quote}”
                    </Typography>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar sx={{ bgcolor: "primary.main" }}>{name[0]}</Avatar>
                        <Box>
                            <Typography sx={{ fontWeight: 800 }}>{name}</Typography>
                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                {role}
                            </Typography>
                        </Box>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}

function PricingCard({ plan, price, subtitle, features, highlight }) {
    return (
        <Card
            variant={highlight ? "elevation" : "outlined"}
            elevation={highlight ? 10 : 0}
            sx={{
                height: "100%",
                borderColor: highlight ? "transparent" : "divider",
                position: "relative",
                overflow: "hidden",
                background: highlight
                    ? (t) =>
                        `linear-gradient(180deg, ${alpha(
                            t.palette.primary.main,
                            0.10
                        )}, rgba(255,255,255,0.92))`
                    : "background.paper",
            }}
        >
            {highlight ? (
                <Chip
                    label="Most Popular"
                    color="primary"
                    sx={{ position: "absolute", top: 16, right: 16 }}
                />
            ) : null}
            <CardContent sx={{ pt: 3 }}>
                <Stack spacing={1.5}>
                    <Typography variant="h6">{plan}</Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {subtitle}
                    </Typography>

                    <Stack direction="row" spacing={1} alignItems="baseline" sx={{ mt: 1 }}>
                        <Typography variant="h4">{price}</Typography>
                        <Typography sx={{ color: "text.secondary" }}>/month</Typography>
                    </Stack>

                    <Divider sx={{ my: 1.5 }} />

                    <Stack spacing={1}>
                        {features.map((f) => (
                            <Stack key={f} direction="row" spacing={1} alignItems="center">
                                <CheckCircleIcon fontSize="small" color="primary" />
                                <Typography variant="body2">{f}</Typography>
                            </Stack>
                        ))}
                    </Stack>
                </Stack>
            </CardContent>
            <CardActions sx={{ p: 3, pt: 0 }}>
                <Button
                    variant={highlight ? "contained" : "outlined"}
                    fullWidth
                    endIcon={<ArrowForwardIcon />}
                >
                    Choose {plan}
                </Button>
            </CardActions>
        </Card>
    );
}

function scrollToId(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
}


export default function Hero() {
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const navItems = [
        { label: "Services", id: "services" },
        { label: "Solutions", id: "solutions" },
        { label: "Proof", id: "proof" },
        { label: "Pricing", id: "pricing" },
        { label: "FAQ", id: "faq" },
        { label: "Contact", id: "contact" },
    ];

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            {/* NAV */}
            <AppBar
                position="sticky"
                elevation={0}
                sx={{
                    bgcolor: alpha("#ffffff", 0.75),
                    backdropFilter: "blur(10px)",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar sx={{ px: { xs: 0 }, minHeight: 72 }}>
                        {/* Logo */}
                        <Stack direction="row" spacing={1.2} alignItems="center" sx={{ flexGrow: 1 }}>
                            <Box
                                sx={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 3,
                                    display: "grid",
                                    placeItems: "center",
                                    bgcolor: "primary.main",
                                    color: "white",
                                }}
                            >
                                <HubIcon />
                            </Box>
                            <Box>
                                <Typography sx={{ fontWeight: 900, lineHeight: 1 }}>
                                    NovaStack
                                </Typography>
                                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                    IT Solutions & Cloud Engineering
                                </Typography>
                            </Box>
                        </Stack>

                        {/* Desktop nav */}
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                        >
                            {navItems.map((it) => (
                                <Button
                                    key={it.id}
                                    color="inherit"
                                    onClick={() => scrollToId(it.id)}
                                    sx={{ color: "text.primary" }}
                                >
                                    {it.label}
                                </Button>
                            ))}
                        </Stack>

                        <Stack direction="row" spacing={1} sx={{ display: { xs: "none", md: "flex" } }}>
                            <Button variant="outlined" onClick={() => scrollToId("contact")}>
                                Talk to Sales
                            </Button>
                            <Button variant="contained" endIcon={<RocketLaunchIcon />} onClick={() => scrollToId("contact")}>
                                Get a Quote
                            </Button>
                        </Stack>

                        {/* Mobile hamburger */}
                        <IconButton
                            sx={{ display: { xs: "inline-flex", md: "none" } }}
                            onClick={() => setDrawerOpen(true)}
                            aria-label="open menu"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Mobile Drawer */}
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <Box sx={{ width: 320, p: 2 }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
                        <Typography variant="h6">Menu</Typography>
                        <IconButton onClick={() => setDrawerOpen(false)} aria-label="close menu">
                            <CloseIcon />
                        </IconButton>
                    </Stack>

                    <Divider sx={{ mb: 1 }} />

                    <List>
                        {navItems.map((it) => (
                            <ListItemButton
                                key={it.id}
                                onClick={() => {
                                    setDrawerOpen(false);
                                    scrollToId(it.id);
                                }}
                            >
                                <ListItemText primary={it.label} />
                            </ListItemButton>
                        ))}
                    </List>

                    <Divider sx={{ my: 2 }} />

                    <Stack spacing={1}>
                        <Button variant="outlined" fullWidth onClick={() => { setDrawerOpen(false); scrollToId("contact"); }}>
                            Talk to Sales
                        </Button>
                        <Button variant="contained" fullWidth endIcon={<RocketLaunchIcon />} onClick={() => { setDrawerOpen(false); scrollToId("contact"); }}>
                            Get a Quote
                        </Button>
                    </Stack>
                </Box>
            </Drawer>

            {/* HERO */}
            <Box
                component="section"
                sx={{
                    py: { xs: 6, md: 9 },
                    position: "relative",
                    overflow: "hidden",
                    background:
                        "radial-gradient(1000px 500px at 20% 10%, rgba(37, 99, 235, 0.18), transparent 60%), radial-gradient(900px 450px at 80% 20%, rgba(124, 58, 237, 0.14), transparent 55%)",
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Stack spacing={2.5}>
                                <Chip
                                    label="Secure • Scalable • Ship faster"
                                    color="primary"
                                    variant="outlined"
                                    sx={{ width: "fit-content" }}
                                />

                                <Typography variant="h2" sx={{ fontSize: { xs: 36, md: 52 } }}>
                                    IT solutions that turn complexity into clarity.
                                </Typography>

                                <Typography variant="body1" sx={{ color: "text.secondary", fontSize: 16, maxWidth: 560 }}>
                                    Cloud migration, cybersecurity, custom software, and managed services—built for modern teams that
                                    need reliability, performance, and measurable outcomes.
                                </Typography>

                                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                                    <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />} onClick={() => scrollToId("contact")}>
                                        Book a free consult
                                    </Button>
                                    <Button variant="outlined" size="large" onClick={() => scrollToId("services")}>
                                        Explore services
                                    </Button>
                                </Stack>

                                <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                                    {[
                                        { icon: <VerifiedUserIcon fontSize="small" />, text: "Security-first delivery" },
                                        { icon: <InsightsIcon fontSize="small" />, text: "Metrics & reporting" },
                                        { icon: <SupportAgentIcon fontSize="small" />, text: "24/7 monitoring" },
                                    ].map((b) => (
                                        <Stack key={b.text} direction="row" spacing={1} alignItems="center">
                                            <Box sx={{ color: "primary.main" }}>{b.icon}</Box>
                                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                                {b.text}
                                            </Typography>
                                        </Stack>
                                    ))}
                                </Stack>
                            </Stack>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Paper
                                elevation={0}
                                variant="outlined"
                                sx={{
                                    p: 3,
                                    borderColor: "divider",
                                    background: alpha("#ffffff", 0.75),
                                    backdropFilter: "blur(10px)",
                                }}
                            >
                                <Stack spacing={2}>
                                    <Stack direction="row" spacing={1.5} alignItems="center">
                                        <Box
                                            sx={{
                                                width: 44,
                                                height: 44,
                                                borderRadius: 3,
                                                display: "grid",
                                                placeItems: "center",
                                                bgcolor: (t) => alpha(t.palette.secondary.main, 0.10),
                                                color: "secondary.main",
                                            }}
                                        >
                                            <PublicIcon />
                                        </Box>
                                        <Box>
                                            <Typography sx={{ fontWeight: 900 }}>
                                                Live Ops Dashboard
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                                Uptime, incidents, deployments, and cost—all in one view.
                                            </Typography>
                                        </Box>
                                    </Stack>

                                    <Divider />

                                    <Grid container spacing={2}>
                                        {[
                                            { label: "Uptime", value: "99.95%", icon: <CloudDoneIcon /> },
                                            { label: "Avg. Response", value: "180ms", icon: <SpeedIcon /> },
                                            { label: "Threats Blocked", value: "12.4k", icon: <SecurityIcon /> },
                                            { label: "Deploys / week", value: "28", icon: <DataObjectIcon /> },
                                        ].map((k) => (
                                            <Grid key={k.label} item xs={6}>
                                                <Paper
                                                    variant="outlined"
                                                    sx={{
                                                        p: 2,
                                                        borderColor: "divider",
                                                        borderRadius: 3,
                                                    }}
                                                >
                                                    <Stack spacing={0.5}>
                                                        <Stack direction="row" spacing={1} alignItems="center">
                                                            <Box sx={{ color: "primary.main" }}>{k.icon}</Box>
                                                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                                                {k.label}
                                                            </Typography>
                                                        </Stack>
                                                        <Typography variant="h5" sx={{ fontWeight: 900 }}>
                                                            {k.value}
                                                        </Typography>
                                                    </Stack>
                                                </Paper>
                                            </Grid>
                                        ))}
                                    </Grid>

                                    <Button variant="contained" endIcon={<ArrowForwardIcon />} onClick={() => scrollToId("proof")}>
                                        See our results
                                    </Button>
                                </Stack>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* SERVICES */}
            <Box component="section" id="services" sx={{ py: { xs: 6, md: 9 } }}>
                <Container maxWidth="lg">
                    <SectionHeader
                        kicker="Services"
                        title="Everything you need to run modern IT"
                        desc="Choose a single engagement or build a long-term partnership. We design, build, secure, and operate your stack end-to-end."
                    />

                    <Grid container spacing={2.5}>
                        <Grid item xs={12} md={4}>
                            <FeatureCard
                                icon={<CloudDoneIcon />}
                                title="Cloud & DevOps"
                                desc="Migrations, CI/CD, IaC, observability, and cost optimization across AWS/Azure/GCP."
                                chips={["Migration", "Kubernetes", "Terraform", "SRE"]}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FeatureCard
                                icon={<SecurityIcon />}
                                title="Cybersecurity"
                                desc="Threat modeling, hardening, SOC playbooks, audits, and secure SDLC practices."
                                chips={["Zero Trust", "Pen-test", "Compliance", "IAM"]}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FeatureCard
                                icon={<DataObjectIcon />}
                                title="Custom Software"
                                desc="Web apps, APIs, integrations, and internal tools that feel fast and scale reliably."
                                chips={["React", "Node", "Microservices", "APIs"]}
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <FeatureCard
                                icon={<SupportAgentIcon />}
                                title="Managed Services"
                                desc="24/7 monitoring, incident response, backups, and proactive improvements."
                                chips={["Monitoring", "On-call", "Backups", "SLAs"]}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FeatureCard
                                icon={<InsightsIcon />}
                                title="Data & Analytics"
                                desc="ETL pipelines, dashboards, and KPI tracking to turn raw data into decisions."
                                chips={["Warehouses", "BI", "Pipelines", "KPIs"]}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FeatureCard
                                icon={<VerifiedUserIcon />}
                                title="Compliance Ready"
                                desc="Policies, evidence collection, and security controls aligned to your industry."
                                chips={["ISO", "SOC 2", "HIPAA*", "GDPR"]}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* SOLUTIONS */}
            <Box component="section" id="solutions" sx={{ py: { xs: 6, md: 9 }, bgcolor: "background.paper" }}>
                <Container maxWidth="lg">
                    <SectionHeader
                        kicker="Solutions"
                        title="Built for the problems your team actually has"
                        desc="We focus on measurable outcomes: fewer incidents, faster delivery, lower cloud costs, and stronger security posture."
                    />

                    <Grid container spacing={2.5} alignItems="stretch">
                        <Grid item xs={12} md={7}>
                            <Card variant="outlined" sx={{ height: "100%", borderColor: "divider" }}>
                                <CardContent>
                                    <Stack spacing={2.5}>
                                        <Typography variant="h6">Outcome-driven delivery</Typography>
                                        <Typography sx={{ color: "text.secondary" }}>
                                            Our process is simple: assess → architect → implement → operate. You get a clear plan, weekly progress,
                                            and a stable system your team can own.
                                        </Typography>

                                        <Grid container spacing={2}>
                                            {[
                                                { icon: <SpeedIcon />, title: "Ship faster", desc: "CI/CD, automated testing, and clear release workflows." },
                                                { icon: <SecurityIcon />, title: "Stay secure", desc: "Security baked in, not bolted on at the end." },
                                                { icon: <CloudDoneIcon />, title: "Scale reliably", desc: "SRE principles, observability, and capacity planning." },
                                                { icon: <InsightsIcon />, title: "Know what's happening", desc: "Dashboards, alerts, and actionable reporting." },
                                            ].map((p) => (
                                                <Grid key={p.title} item xs={12} sm={6}>
                                                    <Stack direction="row" spacing={1.5}>
                                                        <Box sx={{ color: "primary.main", mt: 0.3 }}>{p.icon}</Box>
                                                        <Box>
                                                            <Typography sx={{ fontWeight: 800 }}>{p.title}</Typography>
                                                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                                                {p.desc}
                                                            </Typography>
                                                        </Box>
                                                    </Stack>
                                                </Grid>
                                            ))}
                                        </Grid>

                                        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                                            <Button variant="contained" endIcon={<ArrowForwardIcon />} onClick={() => scrollToId("contact")}>
                                                Get solution design
                                            </Button>
                                            <Button variant="outlined" onClick={() => scrollToId("pricing")}>
                                                View plans
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={5}>
                            <Stack spacing={2.5} sx={{ height: "100%" }}>
                                <Paper
                                    variant="outlined"
                                    sx={{
                                        p: 2.5,
                                        borderColor: "divider",
                                        borderRadius: 4,
                                        background: (t) =>
                                            `linear-gradient(180deg, ${alpha(t.palette.primary.main, 0.08)}, rgba(255,255,255,0.9))`,
                                    }}
                                >
                                    <Stack spacing={1}>
                                        <Typography sx={{ fontWeight: 900 }}>Typical engagement</Typography>
                                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                            2–6 weeks for discovery + roadmap, then implementation in iterative sprints.
                                        </Typography>
                                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 1 }}>
                                            {["Architecture", "Security", "DevOps", "Delivery"].map((x) => (
                                                <Chip key={x} size="small" label={x} variant="outlined" />
                                            ))}
                                        </Stack>
                                    </Stack>
                                </Paper>

                                <Paper variant="outlined" sx={{ p: 2.5, borderColor: "divider", borderRadius: 4 }}>
                                    <Stack spacing={1}>
                                        <Typography sx={{ fontWeight: 900 }}>Tooling we love</Typography>
                                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                            Kubernetes, Terraform, GitHub Actions, Prometheus/Grafana, Sentry, and modern IAM.
                                        </Typography>
                                    </Stack>
                                </Paper>

                                <Paper variant="outlined" sx={{ p: 2.5, borderColor: "divider", borderRadius: 4 }}>
                                    <Stack spacing={1}>
                                        <Typography sx={{ fontWeight: 900 }}>No vendor lock-in</Typography>
                                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                            Everything is documented. Your team can run it with confidence (and sleep).
                                        </Typography>
                                    </Stack>
                                </Paper>
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* PROOF / STATS */}
            <Box component="section" id="proof" sx={{ py: { xs: 6, md: 9 } }}>
                <Container maxWidth="lg">
                    <SectionHeader
                        kicker="Proof"
                        title="Results that show up in your metrics"
                        desc="A few numbers clients typically care about. We like those clients."
                    />

                    <Grid container spacing={2.5}>
                        {[
                            { label: "Incidents reduced", value: "42%", icon: <SecurityIcon /> },
                            { label: "Deployment frequency", value: "3.1×", icon: <RocketLaunchIcon /> },
                            { label: "Cloud cost savings", value: "18–27%", icon: <CloudDoneIcon /> },
                            { label: "Mean time to recovery", value: "-35%", icon: <SpeedIcon /> },
                        ].map((s) => (
                            <Grid key={s.label} item xs={12} sm={6} md={3}>
                                <Paper
                                    variant="outlined"
                                    sx={{
                                        p: 2.5,
                                        borderColor: "divider",
                                        borderRadius: 4,
                                        height: "100%",
                                        background: alpha("#ffffff", 0.9),
                                    }}
                                >
                                    <Stack spacing={1}>
                                        <Box sx={{ color: "primary.main" }}>{s.icon}</Box>
                                        <Typography variant="h4" sx={{ fontWeight: 900 }}>
                                            {s.value}
                                        </Typography>
                                        <Typography sx={{ color: "text.secondary" }}>{s.label}</Typography>
                                    </Stack>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>

                    <Box sx={{ mt: { xs: 4, md: 5 } }}>
                        <Grid container spacing={2.5}>
                            <Grid item xs={12} md={4}>
                                <Testimonial
                                    name="Aarav Patel"
                                    role="CTO, FinTech"
                                    quote="NovaStack cleaned up our infra and made deployments boring—in the best way."
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Testimonial
                                    name="Nisha Mehta"
                                    role="Head of Ops, E-commerce"
                                    quote="We went from constant firefighting to predictable releases and strong monitoring."
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Testimonial
                                    name="Kabir Shah"
                                    role="Founder, SaaS"
                                    quote="Security review passed. Cloud costs went down. Team morale went up."
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Box>

            {/* PRICING */}
            <Box component="section" id="pricing" sx={{ py: { xs: 6, md: 9 }, bgcolor: "background.paper" }}>
                <Container maxWidth="lg">
                    <SectionHeader
                        kicker="Pricing"
                        title="Simple plans. Serious outcomes."
                        desc="Pick what fits your stage. Upgrade anytime. Custom enterprise terms available."
                    />

                    <Grid container spacing={2.5}>
                        <Grid item xs={12} md={4}>
                            <PricingCard
                                plan="Starter"
                                price="$499"
                                subtitle="For early teams that need a reliable foundation."
                                features={[
                                    "Monthly health check",
                                    "Basic monitoring",
                                    "Security baseline review",
                                    "Email support",
                                ]}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <PricingCard
                                plan="Growth"
                                price="$1,499"
                                subtitle="For teams shipping fast and scaling confidently."
                                features={[
                                    "24/7 monitoring & alerts",
                                    "CI/CD improvements",
                                    "Cloud cost optimization",
                                    "Priority support",
                                ]}
                                highlight
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <PricingCard
                                plan="Enterprise"
                                price="$3,999"
                                subtitle="For regulated, high-scale, or mission-critical systems."
                                features={[
                                    "SLA + on-call rotation",
                                    "Security program support",
                                    "Architecture & capacity planning",
                                    "Dedicated solutions lead",
                                ]}
                            />
                        </Grid>
                    </Grid>

                    <Typography variant="caption" sx={{ display: "block", mt: 2, color: "text.secondary" }}>
                        *Compliance availability depends on scope and industry requirements.
                    </Typography>
                </Container>
            </Box>

            {/* FAQ */}
            <Box component="section" id="faq" sx={{ py: { xs: 6, md: 9 } }}>
                <Container maxWidth="lg">
                    <SectionHeader
                        kicker="FAQ"
                        title="Questions you’re already thinking"
                        desc="Quick answers. If you want the longer version, we’ll bring diagrams."
                    />

                    <Stack spacing={1.5}>
                        {[
                            {
                                q: "Do you work with our existing team or replace it?",
                                a: "We work with your team. Our goal is to accelerate delivery and reduce operational burden—then transfer knowledge so you’re not dependent on us.",
                            },
                            {
                                q: "What’s your typical first step?",
                                a: "A lightweight discovery: current architecture, pain points, priorities, and a risk review. Then we propose a roadmap with timelines and measurable outcomes.",
                            },
                            {
                                q: "Can you handle both cloud and security?",
                                a: "Yes. We treat them as one system: secure cloud architecture, IAM, SDLC controls, monitoring, incident response, and compliance evidence—aligned to your needs.",
                            },
                            {
                                q: "How fast can we start?",
                                a: "Often within 1–2 weeks depending on scope. If it’s urgent, we can start with a short stabilization sprint focused on uptime and security posture.",
                            },
                        ].map((item) => (
                            <Accordion key={item.q} disableGutters variant="outlined" sx={{ borderColor: "divider", borderRadius: 3 }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography sx={{ fontWeight: 800 }}>{item.q}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography sx={{ color: "text.secondary" }}>{item.a}</Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </Stack>
                </Container>
            </Box>

            {/* CONTACT */}
            <Box component="section" id="contact" sx={{ py: { xs: 6, md: 9 }, bgcolor: "background.paper" }}>
                <Container maxWidth="lg">
                    <Grid container spacing={2.5} alignItems="stretch">
                        <Grid item xs={12} md={6}>
                            <SectionHeader
                                kicker="Contact"
                                title="Let’s build a plan for your stack"
                                desc="Tell us what you’re trying to achieve. We’ll respond with next steps, a suggested approach, and a realistic timeline."
                            />

                            <Stack spacing={1.5}>
                                {[
                                    { icon: <SupportAgentIcon />, title: "Fast response", desc: "We reply within 24 hours on business days." },
                                    { icon: <SecurityIcon />, title: "Security-first", desc: "We can sign NDAs and follow strict access controls." },
                                    { icon: <InsightsIcon />, title: "Clear outcomes", desc: "Expect measurable goals and weekly progress updates." },
                                ].map((x) => (
                                    <Stack key={x.title} direction="row" spacing={1.5}>
                                        <Box sx={{ color: "primary.main", mt: 0.2 }}>{x.icon}</Box>
                                        <Box>
                                            <Typography sx={{ fontWeight: 900 }}>{x.title}</Typography>
                                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                                {x.desc}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                ))}
                            </Stack>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Paper
                                variant="outlined"
                                sx={{
                                    p: { xs: 2.5, md: 3 },
                                    borderColor: "divider",
                                    borderRadius: 4,
                                    height: "100%",
                                }}
                            >
                                <Stack spacing={2.2}>
                                    <Typography variant="h6">Request a callback</Typography>

                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField label="Full name" fullWidth />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField label="Company" fullWidth />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField label="Email" type="email" fullWidth />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField label="Phone" fullWidth />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="What do you need help with?"
                                                multiline
                                                minRows={4}
                                                fullWidth
                                            />
                                        </Grid>
                                    </Grid>

                                    <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />}>
                                        Submit
                                    </Button>

                                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                        By submitting, you agree to be contacted about your request. No spam—just solutions.
                                    </Typography>
                                </Stack>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* FOOTER */}
            <Box component="footer" sx={{ py: 4, borderTop: "1px solid", borderColor: "divider" }}>
                <Container maxWidth="lg">
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Stack direction="row" spacing={1.2} alignItems="center">
                                <Box
                                    sx={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: 3,
                                        display: "grid",
                                        placeItems: "center",
                                        bgcolor: "primary.main",
                                        color: "white",
                                    }}
                                >
                                    <HubIcon fontSize="small" />
                                </Box>
                                <Box>
                                    <Typography sx={{ fontWeight: 900 }}>NovaStack</Typography>
                                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                        Cloud • Security • Software • Managed Ops
                                    </Typography>
                                </Box>
                            </Stack>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Stack
                                direction={{ xs: "column", sm: "row" }}
                                spacing={1}
                                justifyContent={{ md: "flex-end" }}
                                alignItems={{ xs: "flex-start", md: "center" }}
                            >
                                {navItems.map((it) => (
                                    <Button key={it.id} color="inherit" onClick={() => scrollToId(it.id)}>
                                        {it.label}
                                    </Button>
                                ))}
                            </Stack>
                        </Grid>
                    </Grid>

                    <Typography variant="caption" sx={{ display: "block", mt: 2, color: "text.secondary" }}>
                        © {new Date().getFullYear()} NovaStack. All rights reserved.
                    </Typography>
                </Container>
            </Box>
        </ThemeProvider>
    );
}