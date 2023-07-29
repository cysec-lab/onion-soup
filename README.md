[![Deploy](https://github.com/cysec-lab/DarkwebVisualizer/actions/workflows/deploy.yml/badge.svg)](https://github.com/cysec-lab/DarkwebVisualizer/actions/workflows/deploy.yml)

# Darkweb Visualizer

* for authenticatable users
  * [darkweb.ryuse.dev](https://darkweb.ryuse.dev) (Vercel)
* for general users
  * [dw.cysec-lab.org](http://dw.cysec-lab.org) (GitHub Pages)
  * [bk.dw.cysec-lab.org](http://bk.dw.cysec-lab.org) (Vercel)
  * [preview.darkweb.ryuse.dev](https://preview.darkweb.ryuse.dev) (Vercel)

## for developers

local build

```sh
yarn && yarn dev
```

update dataset

```sh
# download from GitHub release
# https://github.com/cysec-lab/DarkwebVisualizer/releases/tag/dataset
mv /foo/bar/node.json /foo/bar/edge.json ./tools
yarn make_dataset
# commit new dataset
git add public/node.json public/edge.json public/dummy.nodes.json public/dummy.edges.json
git commit -m "update dataset"
# and GitHub Actions will deploy the new dataset
git push -u origin main
```

## Related Links

* https://cosmograph.app/
* https://nightingaledvs.com/how-to-visualize-a-graph-with-a-million-nodes/
* https://github.com/cosmograph-org/cosmos