# Mocki-ui
Mocki is a HTTP benchmarking and data generation tool.

### Appendix
- Target URL: Base url of the server that you want to benchmark. (required).
- Port: If not specified will be assigned based on the `http(8080)/https(443)` (optional).
- Path: Should start with `/` and include all required query parameters.
- Number of connections: Number of virtual users. (Default 10).
- Max connection: Number of max requests of each virtual user. (Default 10).
- Pipelining: Number of virtual users sending at the same moment. (Default 1).
- Duration: The amount of time. (Default 10s).
- Headers: Request headers.
- Payload: Request body (Required for Non-GET methods).

### How to use
#### Static values
Prefix with `fix_` to use prefix query params.
```bash
http://baseurl.com/api/v1/add?name=bob&email=bob@gmail.com&fix_type=user
```
Dummy data will be generated for name and email but not for type. However, don't worry the tool will remove `fix_` before send the request.

#### Dynamic values
All values in query parameters and payload with no `fix` prefix will be randomly and uniquely generated.

#### Hash Files
| OS  | Version | Hash |
| ------------- | ------------- | --------- |
| Linux  | v1.0  | 08be785cabb01df77245706ed8a3f09e6c9ed10b7a681aa4d7af6e08f4b4043f
| Macos  | v1.0  | 0f1317b1f4deb7545de36f39d0e8dc7c1352e434bf817fd2e8c5f92825d5c6dc
| Windows  | v1.0  | 57facb28ca68901ec6423abbcb7c9e03deb0dd03e4a97e282b3c0b861d7539f9