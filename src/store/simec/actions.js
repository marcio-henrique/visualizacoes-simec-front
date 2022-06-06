import simecApi from '@/api/simec';

export default {
  async groupBy(store, options = {}) {
    return await simecApi.groupBy(options);
  },
  async count(store, options = {}) {
    return await simecApi.count(options);
  },
};
