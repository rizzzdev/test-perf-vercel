import http from 'k6/http';
import { check } from 'k6';
import { Trend, Rate } from 'k6/metrics';

const responseTime = new Trend('response_time', true);
const errorRate = new Rate('error_rate');

export const options = {
  scenarios: {
    ramp_up: {
      executor: 'ramping-vus',
      stages: [
        { duration: '3m', target: 300 }
      ]
    }
  },
  thresholds: {
    error_rate: ['rate<0.01']
  }
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

export default function () {
  const res = http.get(`${BASE_URL}/api/health`);
  responseTime.add(res.timings.duration);
  errorRate.add(res.status !== 200);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'has status field': (r) => r.json().status === 'ok',
    'has cpu_intensive field': (r) => r.json().cpu_intensive !== undefined,
    'has timestamp field': (r) => r.json().timestamp !== undefined
  });
}