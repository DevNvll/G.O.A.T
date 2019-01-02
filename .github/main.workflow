workflow "Deploy on Now" {
  on = "push"
  resolves = ["scale to sfo1"]
}

action "shutdown old instance" {
  uses = "actions/zeit-now@master"
  args = "scale vault130.now.sh 0"
  secrets = [
    "ZEIT_TOKEN",
  ]
}

action "remove alias" {
  needs = ["shutdown old instance"]
  uses = "actions/zeit-now@master"
  args = "alias rm vault130.now.sh --yes"
  secrets = [
    "ZEIT_TOKEN",
  ]
}

action "deploy" {
  uses = "actions/zeit-now@master"
  secrets = [
    "ZEIT_TOKEN",
  ]
}

action "alias" {
  needs = ["remove alias", "deploy"]
  uses = "actions/zeit-now@master"
  args = "alias"
  secrets = [
    "ZEIT_TOKEN",
  ]
}

action "scale to sfo1" {
  needs = ["alias"]
  uses = "actions/zeit-now@master"
  args = "scale vault130.now.sh sfo1 1"
  secrets = [
    "ZEIT_TOKEN",
  ]
}
