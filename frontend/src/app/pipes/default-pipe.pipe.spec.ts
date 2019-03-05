import { DefaultPipePipe } from './default-pipe.pipe';

describe('DefaultPipePipe', () => {
  it('create an instance', () => {
    const pipe = new DefaultPipePipe();
    expect(pipe).toBeTruthy();
  });
});
