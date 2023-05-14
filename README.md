# Mocki-ui
Mocki is a HTTP benchmarking and data generation tool.

### Appendix
- Target URL: Base url of the server that you want to benchmark. (required).
- Port: If not specified will be assigned based on the `http(8080)/https(443)` (optional).
- Path: Should start with `/` and include all required query parameters. (required).
- Number of connections: Number of virtual users. (Default 5).
- Max connection: Number of max requests of each virtual user. (Default 5).
- Pipelining: Number of virtual users sending requests at the same moment. (Default 1).
- Duration: The total amount of time for the whole cycle. (Default 10s).
- Headers: Request header.
- Payload: Request body (Required for Non-GET methods).

### How to use
#### Static values
Prefix with `fix_` for fix query params.
```bash
http://baseurl.com/api/v1/add?name=bob&email=bob@gmail.com&fix_type=user
```
Dummy data will be generated for name and email but not for type. However, don't worry the tool will remove `fix_` before send the request.

#### Dynamic values
All values in query parameters with no `fix` prefix and payload will be randomly and uniquely generated.

#### Hash Files
| OS  | Version | Shasum |
| ------------- | ------------- | --------- |
| [Linux](https://github.com/mutairibassam/mocki-ui/releases/download/v1.0/mocki-linux)  | v1.0  | fe17657e056f8befe6adf37b795255ceec0326f681fa7e18d17f0ddc138ba8da
| [Macos](https://github.com/mutairibassam/mocki-ui/releases/download/v1.0/mocki-macos)  | v1.0  | b83361b3e52c726ee66a91be78f0c783084a22669a4e2f2e1883946935436841
| [Windows](https://github.com/mutairibassam/mocki-ui/releases/download/v1.0/mocki-win.exe)  | v1.0  | 229ed76cd11a4fa565c8896f687125627989be7614fd0b2b48801346a3e610fa

To verify shasum value `shasum -a 256 ./path/to/file.txt`
